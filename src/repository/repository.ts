import { Db } from 'mongodb';

export const premierQuery = () => {
  const currentDay = new Date();
  const query = {
    releaseYear: {
      $gt: currentDay.getFullYear() - 1,
      $lte: currentDay.getFullYear(),
    },
    releaseMonth: {
      $gte: currentDay.getMonth() + 1,
      $lte: currentDay.getMonth() + 2,
    },
    releaseDay: {
      $lte: currentDay.getDate(),
    },
  };

  return query;
};

const repository = (db: Db) => {
  const collection = db.collection('movies');

  const getAllMovies = () => {
    return new Promise((resolve, reject) => {
      const movies = [] as Movie[];
      const cursor = collection.find({}, {title: 1, id: 1})
      const addMovie = (movie: Movie) => {
        movies.push(movie)
      }
      const sendMovies = (err: Error) => {
        if (err) {
          reject(new Error('An error occured fetching all movies, err:' + err))
        }
        resolve(movies.slice())
      }
      cursor.forEach(addMovie, sendMovies)
    })
  }

  const getMoviePremiers = () => {
    return new Promise((resolve, reject) => {
      const movies = [] as Movie[];

      const query = premierQuery();      
      const cursor = collection.find(query);

      const addMovie = ( movie: Movie ) => {
        movies.push(movie);
      }
      const sendMovies = (err: Error) => {
        if (err) reject(new Error('An error occurred fetching premier movies, error: ' + err));
        resolve(movies);
      }
      cursor.forEach(addMovie, sendMovies);
    });
  };

  const getMovieById = ( id: string ) => {
    return new Promise((resolve, reject) => {
      const projection = { _id: 0, id: 1, title: 1, format: 1};
      const sendMovie = (err: Error, movie: Movie) => {
        if (err) reject(new Error(`An error occured fetching a movie with id: ${id}, err: ${err}`));
        resolve(movie);
      }

      collection.findOne({id, projection, sendMovie});
    })
  }

  const disconnect = () => {
    db.close();
  }

  return Object.create({
    getAllMovies,
    getMoviePremiers,
    getMovieById,
    disconnect
  })
};

export const connect = (connection: Db) => {
  return new Promise((resolve, reject) => {
    if (!connection) reject(new Error('connection db not supplied!'));
    resolve(repository(connection))
  })
}
