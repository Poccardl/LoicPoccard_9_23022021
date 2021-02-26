

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

    /*
    static sortDateOnBillsTab(data) {
        let sorted_date = []
        //const months_short = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const date_fr = {
            "Jan.": "Janv.",
            "Feb.": "Févr.",
            "Mar.": "Mars.",
            "Apr.": "Avr.",
            "May.": "Mai.",
            "Jun.": "Juin.",
            "Jul.": "Juil.",
            "Aug.": "Août.",
            "Sep.": "Sept.",
            "Oct.": "Oct.",
            "Nov.": "Nov.",
            "Dec.": "Déc."
        }
        for (let element of data) {
            sorted_date.push(element)
        }
        sorted_date.sort((a,b) => {return new Date(b.date) - new Date(a.date)})
        for (let element of sorted_date) {
            let date = element.date.split(' ')
            let month = date_fr[date[1]]
            console.log("month", month)
            element.date = `${date[0]} ${month} ${date[2]}`
        }
        console.log("sorted_date :", sorted_date)
        return sorted_date
    }
    */

}