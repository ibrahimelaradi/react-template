console.time("✔  Done");
const fs = require("fs");
const path = require("path");
const humps = require("humps");
const titlize = require("title");

const args = process.argv.slice(2);
if (args.length < 1) {
	console.error("Please spicify the new name");
	process.exit(0);
}

const [name] = args;
const kebab = humps.decamelize(humps.camelize(name), { separator: "-" });
const title = titlize(kebab.replace("-", " "));

function renamePackageName() {
	const PACKAGE_PATH = path.join(process.cwd(), "package.json");
	const package = JSON.parse(fs.readFileSync(PACKAGE_PATH).toString());
	package.name = kebab;
	fs.writeFileSync(PACKAGE_PATH, JSON.stringify(package, null, 2));
}

function renameHtml() {
	const INDEX_PATH = path.join(process.cwd(), "public", "index.html");
	let content = fs.readFileSync(INDEX_PATH).toString();
	content = content.replace(
		/\<title\>.*\<\/title\>/g,
		`<title>${title}</title>`
	);
	fs.writeFileSync(INDEX_PATH, content);
}

console.info("✏  Renaming package.json..");
renamePackageName();

console.info("✏  Renaming index.html..");
renameHtml();

console.timeEnd("✔  Done");
