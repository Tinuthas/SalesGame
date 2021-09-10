function checkZero(data){

    if(data.toString().length == 1){
      data = "0" + data;
    }
    return data;
}

export function formatDate(date) {
    return `${checkZero(date.getDate())}/${checkZero(date.getMonth()+1)}/${date.getFullYear()} - ${checkZero(date.getHours())}:${checkZero(date.getMinutes())}`
}