
export function getDate(str) {
    return String(str).split('T')[0].split('-').reverse().join("-")
}