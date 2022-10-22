export default function getStyles(styles) {
    let result = ""
    for (let i=0; i<styles.length; i++) {
        result += styles[i]
        if (i != styles.length-1) {
            result += " "
        }
    }
    return result;
}