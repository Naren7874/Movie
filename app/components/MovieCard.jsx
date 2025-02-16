import React, { useContext } from "react";
import { View, Text, Image, StyleSheet, Alert } from "react-native";
import { Button, Card } from "react-native-elements";
import { RentedContext } from "../../context/RentedContext";

export default function MovieCard({ movie, onWatch }) {
  const { rentedMovies, rentMovie } = useContext(RentedContext);

  const isRented = rentedMovies.some((rentedMovie) => rentedMovie.id === movie.id);

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  const handleRentMovie = () => {
    const randomAmount = Math.floor(Math.random() * (9.99 - 2.99 + 1)) + 2.99; // Random amount between $299-$999

    Alert.alert(
      "Confirm Rental",
      `Do you want to rent "${movie.title}" for $${randomAmount}?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Confirm", onPress: () => rentMovie(movie) }, // Rent the movie if confirmed
      ]
    );
  };

  return (
    <Card containerStyle={styles.card}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.details}>⭐ {movie.vote_average || "N/A"} | 📅 {movie.release_date || "Unknown"}</Text>
      <Text style={styles.overview} numberOfLines={3}>{movie.overview || "No description available."}</Text>

      <View style={styles.buttonContainer}>
        {isRented ? (
          <Button title="Watch" buttonStyle={styles.watchButton} onPress={() => onWatch(movie.id)} />
        ) : (
          <Button title="Rent Movie" buttonStyle={styles.rentButton} onPress={handleRentMovie} />
        )}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 10,
    margin: 20,
    backgroundColor: "#fff",
    elevation: 5, 
  },
  image: {
    width: "100%",
    height: 250, 
    borderRadius: 10,
    resizeMode: "contain",  // ✅ Ensures full image is visible
  },
  

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5,
    textAlign: "center",
  },
  details: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
    marginBottom: 5,
  },
  overview: {
    fontSize: 14,
    color: "#444",
    textAlign: "center",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  watchButton: {
    backgroundColor: "#28a745", 
  },
  rentButton: {
    backgroundColor: "#007bff", 
  },
});
