
/**
 * @name sortedArray
 * @description function to shuffled order array
 * @param {Array} Array to be shuffled
 * @returns Array
 */
export const sortedArray = (array) => {
    const newArr = [
        ...array.filter(({urgency}) => urgency === "low"),
        ...array.filter(({urgency}) => urgency === "medium"),
        ...array.filter(({urgency}) => urgency === "high") 
    ];
   
    return newArr;
  };

/**
 * @name insertArrayValues
 * @description function to insert multiples values on array
 * @param {Array} arr array for add new values
 * @param index index into array to set data
 * @param items list of multiples items to set into array
 * @returns Array
 */
export const insertArrayValues = (arr, index, ...items)=>{
    return [
            ...arr.slice(0, index),
            ...items,
            ...arr.slice(index)
        ];
   };

   /**
 * @name secondsToString
 * @description function to convert seconds to hours and minutes
 * @param seconds number of seconds to converted
 * @returns Array
 */
export const secondsToString = (seconds)=>{
    var hour = Math.floor(seconds / 3600);
    hour = (hour < 10)? '0' + hour : hour;
    var minute = Math.floor((seconds / 60) % 60);
    minute = (minute < 10)? '0' + minute : minute;
    var second = seconds % 60;
    second = (second < 10)? '0' + second : second;
    
    return hour + ':' + minute + ':' + second;
   };

   /**
 * @name secondsToString
 * @description function find the max value of ID and set id mayor
 * @param seconds number of seconds to converted
 * @returns Array
 */
   export const filterIds = (tasks)=>{
    let newTaskId = 1;
        
    const ids = tasks.map(object => {
      return object.id;
    });
    if (ids.length > 0) {
      const max = Math.max(...ids);
      newTaskId = max + 1;  
    }
    
    return newTaskId
   }

    /**
 * @name secondsToString
 * @description function to convert seconds to hours and minutes
 * @param seconds number of seconds to converted
 * @returns Array
 */
export const urgencyValue = (seconds)=>{
  let customUrgency = "";
  if(seconds <= 1800){
    customUrgency = "low";
  }else if(seconds > 1800 && seconds <=  2700){            
      customUrgency = "medium";
  }else{
    customUrgency = "high";
  }
  
  return customUrgency;
 };