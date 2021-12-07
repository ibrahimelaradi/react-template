console.time("✔  Done");

const humps = require("humps");
const title = require("title");
const fs = require("fs");
const path = require("path");
const ejs = require("ejs");

const TEMPLATES_DIR = path.join(process.cwd(), "templates");
const DEST_BASE = path.join(process.cwd(), "src");

const args = process.argv.slice(2);

if (args.length < 2) {
	console.error("Failed to generate!");
	console.error("Usage: yarn g <template> <name>");
	console.error("Or");
	console.error("Usage: npm run g <template> <name>");
	process.exit(0);
}

const [template, rawName] = args;

const name = {
	kebab: humps.decamelize(humps.camelize(rawName), { separator: "-" }),
	camel: humps.camelize(rawName),
	pascal: humps.pascalize(rawName),
	title: "",
};
name.title = title(name.kebab.replace("-", " "));

const templates = fs.readdirSync(TEMPLATES_DIR);

if (!templates.includes(template)) {
	console.error("Failed to generate!");
	console.error("Available templates are", templates.join(", "));
	process.exit(0);
}

console.info("👁  Gathering files..");
const TEMPLATE_DIR = path.join(TEMPLATES_DIR, template);
const files = fs.readdirSync(TEMPLATE_DIR);

console.info("⚙  Generating templates..");
const SRC_PLURAL = template !== "ui" ? template + "s" : template;
files.forEach((file) => {
	const content = fs
		.readFileSync(path.join(TEMPLATES_DIR, template, file))
		.toString();
	const generated = ejs.render(content, { name });
	const destBase = path.join(DEST_BASE, SRC_PLURAL, name.kebab);
	const dest = path.join(
		destBase,
		file.replace("NAME", name.kebab).replace(".ejs", "")
	);
	if (!fs.existsSync(destBase)) fs.mkdirSync(destBase);
	fs.writeFileSync(dest, generated);
	console.info("✔  Generated file:  ", dest);
});

const INDEX_PATH = path.join(DEST_BASE, SRC_PLURAL, "index.ts");
const indexExists = fs.existsSync(INDEX_PATH);
if (indexExists) {
	console.info("🧵  Patching index files..");
	let content = fs.readFileSync(INDEX_PATH).toString();
	content += "\n";
	content += `export * from "./${name.kebab}";`;
	content = content.replace(/\n+/g, "\n");
	fs.writeFileSync(INDEX_PATH, content);
}

console.timeEnd("✔  Done");
