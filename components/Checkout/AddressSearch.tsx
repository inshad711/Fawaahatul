import { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { SearchIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  setCartItemsCheckout,
  setPaymentDetails,
  setShippingCharges,
  setShippingLoading,
} from "@/store/slice/sCheckout";

const AddressSearch = ({
  countrySelected,
  onAddressChange,
  address,
  isError,
}: any) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSelected, setIsSelected] = useState(false); // ✅ Track if suggestion is selected

  const { cartItems, customerEnableCod } = useSelector(
    (state: RootState) => state.checkoutsNew
  );

  const dispatch = useDispatch();

  // Debounce input to avoid frequent API calls
  useEffect(() => {
    if (isSelected) return; // ✅ If a suggestion is selected, don't search again

    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [query, isSelected]);

  // Fetch suggestions when debouncedQuery changes
  useEffect(() => {
    if (debouncedQuery.length >= 3) {
      fetchAddressSuggestions(debouncedQuery);
    } else {
      onAddressChange({
        address: "",
        city: "",
        state: "",
        pincode: "",
        isSelected: false,
      });
      setSuggestions([]);
    }
  }, [debouncedQuery]);

  const fetchAddressSuggestions = async (input: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.BACKEND}/api/address-suggestions?query=${input}&countrySelected=${countrySelected}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.API_KEY}`,
          },
        }
      );
      const data = await response.json();
      setSuggestions(data || []);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]); // Reset on error
    } finally {
      setLoading(false);
    }
  };

  // ✅ When user selects a suggestion
  const handleSelectSuggestion = async (selectedAddress: any) => {
    setQuery(selectedAddress?.description);
    onAddressChange({ ...selectedAddress, isSelected: true });
    setIsSelected(true);
    setSuggestions([]);
    await fetchShippingCharges(selectedAddress);
  };

  const fetchShippingCharges = async (selectedAddress: any) => {
    try {
      dispatch(setShippingLoading(true));
      const filteredCartItems = cartItems?.cart?.map(
        ({ id, combination }: any) => ({
          id,
          combination,
        })
      );

      const response = await fetch(
        `${process.env.BACKEND}/api/shipping-charges`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.API_KEY}`,
          },
          body: JSON.stringify({
            address: selectedAddress,
            cartItems: filteredCartItems,
            customerEnableCod,
          }),
        }
      );

      const data = await response.json();
      dispatch(setShippingCharges(data?.shippingRate));
      dispatch(setPaymentDetails(data?.payment_methods));
      // 🆕 Update cart items with cod_disable flag
      const updatedCartItems = cartItems?.cart?.map((cartItem: any) => ({
        ...cartItem,
        cod_disable: data?.globalCODSettings?.disabledProducts?.some(
          (disabled: any) =>
            disabled.id === cartItem.id &&
            (disabled.combination === cartItem.combination ||
              disabled.combination === null)
        ),
      }));

      // console.log(updatedCartItems, "updatedCartItems");
      //   console.log(updatedCartItems, "Updated Cart Items with COD Disabled");
      dispatch(setCartItemsCheckout({ cart: updatedCartItems }));
    } catch (error) {
      console.error("Error fetching shipping charges:", error);
    } finally {
      dispatch(setShippingLoading(false));
    }
  };

  const handleClearSelection = () => {
    setQuery("");
    setIsSelected(false);
    onAddressChange({
      address: "",
      city: "",
      state: "",
      pincode: "",
      isSelected: false,
    });
  };

  return (
    <div className="w-full relative">
      <Label htmlFor="address" className="text-xs text-gray-600 mb-1 block">
        Address
      </Label>
      <div className="relative">
        <Input
          id="address"
          type="text"
          value={isSelected ? address : query}
          className={`border ${
            isError ? "border-red-500" : "border-gray-300"
          } rounded-md py-2 px-3 w-full`}
          disabled={isSelected}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsSelected(false); // ✅ Reset selection when typing
          }}
        />
        {!isSelected && (
          <SearchIcon className="absolute right-2 top-2 text-gray-500 text-xs w-4" />
        )}
      </div>

      {loading && <p className="text-gray-500 text-sm mt-1">Loading...</p>}

      {/* Suggestions List */}
      {suggestions.length > 0 && (
        <ul className="absolute z-50 bg-white shadow-lg rounded mt-2 w-full">
          {suggestions.map((suggestion: any) => (
            <li
              key={suggestion.place_id}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelectSuggestion(suggestion)}
            >
              {suggestion.description}
            </li>
          ))}
        </ul>
      )}

      {isSelected && (
        <button
          type="button"
          onClick={handleClearSelection}
          className="absolute right-2 top-8 text-gray-500 text-xs w-4"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default AddressSearch;
