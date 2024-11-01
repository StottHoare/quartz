import { pathToRoot, slugTag } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const FrontmatterPropertiesList: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const frontmatter = fileData.frontmatter;
  const ignore = ['tags', 'created', 'modified', 'title'];
  const filteredFrontmatter = Object.entries(frontmatter)
    .filter(([key]) => !ignore.includes(key))
    .filter(([key, value]) => value != null && value !== '');

  const formatKey = (str: string) => {
    return str
        .split('-') // Split the string by dashes
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
        .join(' '); // Join the words with spaces
  };

  const isURL = (value: string) => {
    try {
      new URL(value);
      return true;
    } catch (_) {
      return false;
    }
  };

  if (filteredFrontmatter.length === 0) {
    return null;
  }

  return (
    <table className={classNames(displayClass, "frontmatter-properties")}>
      <tbody>
        {filteredFrontmatter.map(([key, value]) => (
          <tr key={key}>
            <th>{formatKey(key)}</th>
            <td>
              {Array.isArray(value) ? (
                <ul>
                  {value.map((item, index) => (
                    <li key={index}>
                      {isURL(item) ? (
                        <a href={item} target="_blank" rel="noopener noreferrer">{item}</a>
                      ) : (
                        item
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                isURL(value) ? (
                  <a href={value} target="_blank" rel="noopener noreferrer">{value}</a>
                ) : (
                  value
                )
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};


FrontmatterPropertiesList.css = `
.frontmatter-properties {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
}

.frontmatter-properties th,
.frontmatter-properties td {
  border: 1px solid var(--border-color);
  padding: 0.5rem;
  text-align: left;
}

.frontmatter-properties th {
  background-color: var(--header-background);
  font-weight: bold;
}

.frontmatter-properties td ul {
  list-style: none;
  padding-left: 0;
  margin: 0;
}

.frontmatter-properties td ul li {
  margin: 0.2rem 0;
}

.frontmatter-properties tr:nth-child(even) {
  background-color: var(--row-background);
}
`

export default (() => FrontmatterPropertiesList) satisfies QuartzComponentConstructor
