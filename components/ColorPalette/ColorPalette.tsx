// app/components/ColorPallete.tsx (Server Component)

interface ColorPalleteProps {
  colorPallete: {
    background?: String;
    primary?: String;
    primaryText?: String;
    secondary?: String;
    heading?: String;
    text?: String;
  };
}

const ColorPallete: React.FC<ColorPalleteProps> = ({ colorPallete }) => {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
          :root {
            --template-background: ${colorPallete?.background};
            --template-primary: ${colorPallete?.primary};
            --template-primaryText: ${colorPallete?.primaryText};
            --template-secondary: ${colorPallete?.secondary};
            --template-heading: ${colorPallete?.heading};
            --template-text: ${colorPallete?.text};
          }
        `,
      }}
    />
  );
};

export default ColorPallete;
