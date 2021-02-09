import React, { useState, useEffect } from "react"

import api from "./services/api"

import {
  View,
  Text,
  FlatList,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native"

export default function App() {
  const [repositories, setRepositories] = useState([])

  async function handleLikeRepository(id) {
    try {
      const { data } = await api.post(`repositories/${id}/like`)

      const updatedRepositories = repositories.map((repository) => {
        if (repository.id === id) {
          return data
        } else {
          return repository
        }
      })

      setRepositories(updatedRepositories)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    async function fetchRepositries() {
      try {
        const { data } = await api.get("repositories")

        setRepositories(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchRepositries()
  }, [])

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        {repositories && (
          <FlatList
            data={repositories}
            keyExtractor={(repository) => repository.id}
            renderItem={({ item: repository }) => (
              <View style={styles.repositoryContainer}>
                <Text style={styles.repository}>{repository.title}</Text>

                <FlatList
                  style={styles.techsContainer}
                  data={repository.techs}
                  keyExtractor={(tech) => tech}
                  renderItem={({ item: tech }) => (
                    <Text style={styles.tech}>{tech}</Text>
                  )}
                />

                <View style={styles.likesContainer}>
                  <Text
                    style={styles.likeText}
                    testID={`repository-likes-${repository.id}`}
                  >
                    {repository.likes <= 1
                      ? `${repository.likes} curtida`
                      : `${repository.likes} curtidas`}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleLikeRepository(repository.id)}
                  testID={`like-button-${repository.id}`}
                >
                  <Text style={styles.buttonText}>Curtir</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 14,
  },
})
