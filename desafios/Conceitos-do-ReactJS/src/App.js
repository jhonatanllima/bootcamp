import React, { useEffect, useState } from "react"

import api from "./services/api"

import "./styles.css"

function App() {
  const [repositories, setRepositories] = useState([])

  async function handleAddRepository() {
    const { data } = await api.post("repositories", {
      title: "First project with NodeJS.",
      url: "https://github.com/jhonatanllima/",
      techs: ["Node", "Express", "TypeScript"],
    })

    setRepositories([...repositories, data])
  }

  async function handleRemoveRepository(id) {
    try {
      const response = await api.delete(`repositories/${id}`)

      if (response.status === 204) {
        setRepositories(
          repositories.filter((repository) => repository.id !== id)
        )
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data)
    })
  }, [])

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  )
}

export default App
