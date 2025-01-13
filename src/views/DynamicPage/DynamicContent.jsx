import JsxParser from "react-jsx-parser";

const DynamicContent = ({ componentCode }) => {
  return (
    <div>
      <JsxParser
        jsx={componentCode}
        components={{ Button: () => <button>Test Button</button> }}
      />
    </div>
  );
};

export default DynamicContent;
