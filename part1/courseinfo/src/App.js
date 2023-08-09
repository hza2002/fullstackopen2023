const Header = ({ name }) => { return (<h1> {name}</h1>) }

const Content = ({ parts }) => {
  const Part = ({ part }) => (<p> {part.name} {part.exercises} </p>)
  return (
    <>
      <Part part={parts[0]} />
      <Part part={parts[1]} />
      <Part part={parts[2]} />
    </>
  )
}

const Total = ({ parts }) => {
  let sum = 0;
  parts.forEach(element => sum += element.exercises);
  return (<p>Number of exercises {sum}</p>)
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  };

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App
