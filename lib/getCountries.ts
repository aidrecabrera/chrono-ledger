import countries from "../server/data/countries.json"

export function ajaxFindCountry (query: string) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const results = countries.filter((element, index, array) => {
        return element.name.toLowerCase().includes(query.toLowerCase())
      })
      resolve(results)
    }, 1000)
  })
}