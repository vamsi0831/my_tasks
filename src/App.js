import './App.css'
import {Component} from 'react'
import {v4} from 'uuid'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

// Replace your code here
const EachTask = props => {
  const {details} = props
  const {taskName, taskCategory} = details
  // const findItem = tagsList.find(item => item.optionId === taskCategory)
  return (
    <li className="tasks-list-item">
      <p className="tasks-para">{taskName}</p>
      <p className="tag-para">{taskCategory}</p>
    </li>
  )
}

const TagItem = props => {
  const {details, onClickTagButton, isActive} = props
  const {displayText, optionId} = details
  const buttonClass = isActive ? 'bg-button' : 'tag-button'
  const onClickTag = () => {
    onClickTagButton(optionId)
  }
  return (
    <li>
      <button type="button" className={buttonClass} onClick={onClickTag}>
        {displayText}
      </button>
    </li>
  )
}

class App extends Component {
  state = {
    task: '',
    tag: tagsList[0].optionId,
    list: [],
    activeTag: 'INITIAL',
  }

  onChangeSelect = event => {
    this.setState({tag: event.target.value})
  }

  onChangeTask = event => {
    this.setState({task: event.target.value})
  }

  //   onClickTagButton = button => {
  //     const {newList} = this.state
  //     const findItem = newList.find(item => item.optionId === button)
  //     if (findItem.isTrue === false) {
  //       const filteredList = newList.map(item => {
  //         if (item.optionId === button) {
  //           return {...item, isTrue: true}
  //         }
  //         return {...item, isTrue: false}
  //       })
  //       this.setState({newList: filteredList, selectTag: button})
  //     }
  //     if (findItem.isTrue === true) {
  //       const filteredList = newList.map(item => {
  //         if (item.optionId === button) {
  //           return {...item, isTrue: false}
  //         }
  //         return item
  //       })
  //       this.setState({newList: filteredList, selectTag: ''})
  //     }
  //   }

  onClickTagButton = id => {
    this.setState(prevState => ({
      activeTag: prevState.activeTag === id ? 'INITIAL' : id,
    }))
  }

  onSubmitTask = event => {
    event.preventDefault()
    const {task, tag} = this.state
    const taskName = task
    const taskCategory = tag
    if (taskName.length === 0) {
      // eslint-disable-next-line
      alert('Enter the task')
    } else {
      const taskValue = {
        id: v4(),
        taskName,
        taskCategory,
      }
      this.setState(prevState => ({
        list: [...prevState.list, taskValue],
        task: '',
        tag: tagsList[0].optionId,
      }))
    }
  }

  render() {
    const {tag, list, task, activeTag} = this.state
    const filteredList =
      activeTag === 'INITIAL'
        ? list
        : list.filter(item => item.taskCategory === activeTag)
    return (
      <div className="bg-container">
        <form className="form-container" onSubmit={this.onSubmitTask}>
          <h1 className="heading">Create a Task</h1>
          <div className="input-container">
            <label htmlFor="task" className="label">
              Task
            </label>
            <input
              placeholder="Enter the task here"
              id="task"
              className="input"
              value={task}
              onChange={this.onChangeTask}
            />
          </div>
          <div className="input-container">
            <label className="label" htmlFor="tags">
              Tags
            </label>
            <select
              id="tags"
              className="input"
              value={tag}
              onChange={this.onChangeSelect}
            >
              {tagsList.map(item => (
                <option value={item.optionId} key={item.optionId}>
                  {item.displayText}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="add-button">
            Add Task
          </button>
        </form>
        <div className="container">
          <h1 className="tags-heading">Tags</h1>
          <ul className="ul-container">
            {tagsList.map(item => {
              const isActive = activeTag === item.optionId
              return (
                <TagItem
                  key={item.optionId}
                  details={item}
                  onClickTagButton={this.onClickTagButton}
                  isActive={isActive}
                />
              )
            })}
          </ul>
          <h1 className="tags-heading">Tasks</h1>
          <ul className="tasks-container">
            {filteredList.length === 0 ? (
              <div className="no-tasks-container">
                <p className="no-tasks-para">No Tasks Added Yet</p>
              </div>
            ) : (
              filteredList.map(item => (
                <EachTask key={item.id} details={item} />
              ))
            )}
          </ul>
        </div>
      </div>
    )
  }
}
export default App
