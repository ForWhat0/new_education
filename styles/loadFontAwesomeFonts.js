
    export default function ensureCssFileInclusion(cssFileToCheck) {
        let styleSheets = document.styleSheets;
        for (let i = 0, max = styleSheets.length; i < max; i++) {
            if (styleSheets[i].href == cssFileToCheck) {
                return;
            }
        }
        // because no matching stylesheets were found, we will add a new HTML link element to the HEAD section of the page.
        let link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://downtimmonkey.com/path-xxx/font-awesome/css/font-awesome.min.css";
        document.getElementsByTagName("head")[0].appendChild(link);
    }
    ensureCssFileInclusion("https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");
