

export default class Toolbox {

    static sortDateOnBillsTab(data) {
        let sorted_date = []
        if (data) {
            for (let element of data) {
                sorted_date.push(element)
            }
            sorted_date.sort((a,b) => {return new Date(b.date) - new Date(a.date)})
        }
        return sorted_date
    }
}