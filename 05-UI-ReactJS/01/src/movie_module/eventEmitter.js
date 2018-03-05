export default class EventEmitter {

  constructor() {

    //Callbacks are mapped to an event name so a map is the best option.
    this._eventList = new Map();
  }


  get eventList () { return this._eventList; }

  on(eventName, callback) {

    if(this.eventList.has(eventName)) {

      //If callback is already registered for the event, no addition is done.
      if(this.eventList.get(eventName).has(callback)) {
        return false;
      }

      //A new callback is added to the event's callback set.
      this.eventList.get(eventName).add(callback);
    }
    else {

      //A new set is created with the new callback and attached to the eventList.
      let set = new Set();
      set.add(callback);
      this._eventList.set(eventName, set);
    }
    return true;
  }

  emit(eventName) {

    //Just iterates through the current event name's array and call the callbacks
    if(this.eventList.has(eventName)) {

      //All callbacks stored for the target event are invoked.
      for(let callback of this.eventList.get(eventName)) {
        callback(this);
      }
    }
  }

  /*FIXME? This method is confusing, it might be better to have only one callback
  per eventName, but this is telling us that we have more than one.
  The only way I founded to compare callbacks is to compare their toString
  method.*/
  /*After asking I was told it was only one callback, so having only event's
  name will do the job to clear an event listening. */
  /*After doing exercise 03 it had more sense that it could be posible to have
  more than one listener for each event name, so method will be resetted to
  pre commit 23 state. */
  off(eventName, callback) {
    if(this.eventList.has(eventName)) {
      let listenerList = this.eventList.get(eventName);
      listenerList.delete(callback);

      //If callback was not passed as a function, it would become undeletable...
      for(let listener of listenerList) {
        if(listener.toString() === callback.toString()) {
          listenerList.delete(listener);
        }
      }
    }
  }
}
