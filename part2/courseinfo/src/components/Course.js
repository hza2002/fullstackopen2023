import React from 'react'

const Course = ({ course }) => {
  const name = course.name
  const parts = course.parts

  const Header = ({ course }) => <h1>{course}</h1>

  const Total = ({ parts }) => {
    const sum = parts.reduce((previous, current) => previous + current.exercises, 0)
    return (<p><b>Number of exercises {sum}</b></p>)
  }

  const Part = ({ part }) => <p> {part.name} {part.exercises} </p>

  const Content = ({ parts }) => (<> {parts.map(part => <Part key={part.id} part={part} />)} </>)

  return (
    <div>
      <Header course={name} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default Course 
