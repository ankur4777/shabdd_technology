const fs = require("fs");
const path = require("path");

const componentName = process.argv[2];
if (!componentName) {
  console.log("❌ Please provide a component name!");
  process.exit(1);
}

const folderPath = path.join("src", "component", componentName);
fs.mkdirSync(folderPath, { recursive: true });

// Capitalized JSX file name
const jsxFileName = `${componentName.charAt(0).toUpperCase() + componentName.slice(1)}.jsx`;
// Lowercase CSS file name
const cssFileName = `${componentName.toLowerCase()}.css`;

const jsxContent = `import './${cssFileName}';

function ${componentName}() {
  return (
    <div className="${componentName.toLowerCase()}">
      {/* ${componentName} content */}
    </div>
  );
}

export default ${componentName};
`;

const cssContent = `.${componentName.toLowerCase()} {
  /* Add your styles here */
}`;

fs.writeFileSync(path.join(folderPath, jsxFileName), jsxContent);
fs.writeFileSync(path.join(folderPath, cssFileName), cssContent);

console.log(`✅ ${jsxFileName} and ${cssFileName} created successfully!`);
