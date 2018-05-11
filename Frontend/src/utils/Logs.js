import axios from 'axios'


const getLogs  = (date) => {
    return axios.get(`https://api.cebroker.com/v1/cerenewaltransactions/GetLogsRecordData?startdate=${date}&enddate=${date}&standstate=FL`, {
        responseType: 'json'
    })
}


export default getLogs