import EventEmitter from './eventEmitter.js';
import Actor from './actor.js';

//Movie class declaration
class Movie extends EventEmitter {

  constructor(name, year, duration) {
    super();
    this._name = name;
    this._year = year;
    this._duration = duration;

    this._status = new UnstartedMovie(this);

    this._cast = new Set();

  }

  //Getters
  get name () { return this._name; }

  get year () { return this._year; }

  get duration () { return this._duration; }

  get status () { return this._status; }

  get cast () { return this._cast; }

  //Setters

  set name (name) { this._name = name; }

  set year (year) { this._year = year; }

  set duration  (duration) {
    if(duration < 1){
      throw new Error("duration value not valid...");
    }

    this._duration = duration;
    this._status.endingTime = duration;
  }

  set status (status) { this._status = status; }

  //Plays the movie (Fake!)
  play() {
    this.status.play();
  }

  //Pauses movie playing
  pause() {
    this.status.pause();
  }

  //Resumes playing when paused
  resume() {
    this.status.resume();
  }

  addCast(cast) {
    if(!Array.isArray(cast)) {
      cast = [cast];
    }
    cast.forEach((actor) => {
      if(!this.cast.has(actor) && actor) {
        this.cast.add(actor);
      }
    });
  }
}

/*A state like pattern will be used to modelate how movies behave.
JS does not have interface like Java but this will be only declarated as
a template*/
class MovieStatus {

  //Movie object must be passed as a param in order to be used.
  constructor(movie, playTime, endingTime=undefined, timer=undefined) {
    this._movie = movie;
    this._playTime = playTime;
    this._endingTime = endingTime;
    this._timer = timer;
  }

  //Getters
  get movie () { return this._movie; }

  get playTime () { return this._playTime; }

  get endingTime () { return this._endingTime; }

  get timer () { return this._timer; }

  //Setters
  set movie (movie) { this._movie = movie; }

  set playTime (playTime) { this._playTime = playTime; }

  set endingTime  (duration)  {
    if(this._playTime) {
      this._endingTime = new Date(this._playTime.getTime());
      this._endingTime.setTime(this._playTime.getTime());

      this._endingTime.setHours(0);
      this._endingTime.setMinutes(0);
      this._endingTime.setSeconds(0);

      this._endingTime.setTime(this._endingTime.getTime() + duration * 1000);
    }
  }

  set timer (timer) { this._timer = timer; }

  play() {
  }

  pause() {
  }

  resume() {
  }
}

//Unstarted modelates behaviour when the movies hasn't started playing
class UnstartedMovie extends MovieStatus {

  constructor(movie){
    super(movie, new Date())

    //Inits play time to 00:00:00
    this.playTime.setHours(0);
    this.playTime.setMinutes(0);
    this.playTime.setSeconds(0);

    //Inits ending time to 00:00:00 + movie duration
    this.endingTime = new Date(this.playTime.getTime());
    this.endingTime.setTime(this.playTime.getTime() + this.movie.duration * 1000);
  }

  //Starts playing the movie.
  play() {
    //Playing started message.
    this.movie.emit('play');

    //Playing interval is started.
    this.timer = setInterval((movie) => {

      //Comment if you don't want to see playing status per second.
      movie.emit('playTick');

      //Increments current playing time
      movie.status.playTime.setTime(movie.status.playTime.getTime() + 1000);

      //If movie duration is met, interval is cleared.
      if(movie.status.endingTime.getTime() <= (movie.status.playTime.getTime() - 1000)) {
        clearInterval(movie.status.timer);
        movie.status = new UnstartedMovie(this.movie);

        //Playing finished message.
        movie.emit('finish');
      }

    }, 1000, this.movie);

    //Movie has started playing, the state changes now so current status changes
    this.movie.status = new PlayingMovie(this.movie, this.playTime,
      this.endingTime, this.timer);
  }

  pause() {
    //Pause does nothing on this state...
  }

  resume() {
    //resume also does nothing on this state...
  }
}

//Playing movie modeletas how a movie behaves when it is playing.
class PlayingMovie extends MovieStatus{

  play() {
    /*Play does nothing on this state (it could be discussed if it should
    restart the movie, but this is a design matter */
  }

  pause() {

    //Now movie must be paused
    clearInterval(this.timer);

    //Playing has been paused
    this.movie.emit('pause');

    //Status changes to paused so...
    this.movie.status = new PausedMovie(this.movie, this.playTime,
      this.endingTime, this.timer);
  }

  resume() {
    //Resume does nothing on this state
  }
}

//Paused modelates how the movie beheaves when it is not playing.
class PausedMovie  extends MovieStatus {

  play() {
    //Again play does nothing (or should start from the beginning? --> design!)
  }

  pause() {
    //Pause does nothing
  }

  resume() {

    //Movie playing has resumed
    this.movie.emit('resume')

    //Playing interval is restarted.
    this.timer = setInterval((movie) => {

      //Comment if you don't want to see playing status per second.
      movie.emit('playTick');

      //Increments current playing time
      movie.status.playTime.setTime(movie.status.playTime.getTime() + 1000);

      //If movie duration is met, interval is cleared.
      if(movie.status.endingTime.getTime() <= (movie.status.playTime.getTime() - 1000)) {
        clearInterval(movie.status.timer);
        movie.status = new UnstartedMovie(this.movie);

        //Playing finished message.
        movie.emit('finish');
      }

    }, 1000, this.movie);

    //Movie has started playing again, the state changes...
    this.movie.status = new PlayingMovie(this.movie, this.playTime,
    this.endingTime, this.timer);
  }
}

var movieModule = {
  Movie: Movie,
  Actor: Actor,
  EventEmitter: EventEmitter
}

export default movieModule;
