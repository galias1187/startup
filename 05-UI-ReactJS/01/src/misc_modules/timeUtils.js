
//Obtains a seconds value from a time string
export function timeStringToSeconds(timeString) {

  //Checks if timeString is a valid time string
  if(!validateTimeString(timeString)) {
    return false;
  }


  //Parsing time
  let timeComponents = {
    hours: parseInt(timeString.slice(0, 2), 10),
    minutes: parseInt(timeString.slice(3, 5), 10),
    seconds: timeString.length === 5 ? 0 : parseInt(timeString.slice(6, 8), 10)
  }

  return timeComponents.hours * 3600 + timeComponents.minutes * 60 + timeComponents.seconds;

}

//Obtains a time string from a value in seconds.
export function secondsToTimeString(seconds) {

  const timeComponents = {
    hours: Math.floor(seconds / 3600),
    minutes: Math.floor(Math.floor(seconds % 3600) / 60),
    seconds: Math.floor(Math.floor(seconds % 3600) % 60)
  }

  const hour = timeComponents.hours < 10 ? `0${timeComponents.hours}` :
               `${timeComponents.hours}`;
  const minute = timeComponents.minutes < 10 ? `0${timeComponents.minutes}` :
                 `${timeComponents.minutes}`;
  const second = timeComponents.seconds < 10 ? `0${timeComponents.seconds}` :
                 `${timeComponents.seconds}`;

  return `${hour}:${minute}:${second}`;

}


//Checks if a string is a valid time string(hh:mm:ss)
function validateTimeString(timeString) {

  if(!timeString) {
    return false;
  }

  //Validates string length
  if(!(timeString.length === 8 || timeString.length === 5)) {
    return false;
  }

  //obtains time component
  let timeComponents = {
    hours: timeString.slice(0, 2),
    minutes: timeString.slice(3, 5),
    seconds: timeString.length === 5 ? "00" : timeString.slice(6, 8)
  }


  //Checks if time components are numerical values
  if(!(isDigit(timeComponents.hours[0]) && isDigit(timeComponents.hours[1]))) {
    return false;
  }

  if(!(isDigit(timeComponents.minutes[0]) && isDigit(timeComponents.minutes[1]))) {
    return false;
  }

  if(!(isDigit(timeComponents.seconds[0]) && isDigit(timeComponents.seconds[1]))) {
    return false;
  }



  //Parses components and validates ranges
  let hours = parseInt(timeComponents.hours, 10);
  let minutes = parseInt(timeComponents.minutes, 10);
  let seconds = parseInt(timeComponents.seconds, 10);

  if(hours < 0) {
    return false;
  }

  if(minutes < 0 || minutes > 59) {
    return false;
  }

  if(seconds < 0 || seconds > 59) {
    return false;
  }

  return true;

}

//Checks if a character is a digit
function isDigit(char) {
  return char >= '0' && char <= '9';
}
