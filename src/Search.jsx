import React, { Component } from 'react'
import axios from 'axios'
class LiveSearchFilter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Product: [],
    }
    this.cancelToken = ''
    this.getVal = this.getVal.bind(this)
    this.node = React.createRef()
  }
  componentDidMount() {
    document.addEventListener('mousedown', this.getVal)
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.getVal)
  }
  getVal = (e) => {
    if (this.node.current.contains(e.target)) {
      return
    }
    this.setState({
      userList: [],
    })
  }
  onChange = async (e) => {
    if (this.cancelToken) {
      this.cancelToken.cancel()
    }
    this.cancelToken = axios.CancelToken.source()
    await axios
      .get('http://localhost:3000/api/products', {
        cancelToken: this.cancelToken.token,
      })
      .then((res) => {
        this.setState({
            Product: res.data,
        })
      })
      .catch((e) => {
        if (axios.isCancel(e) || e) {
          console.log('Data not found.')
        }
      })
    let stringKwd = e.target.value.toLowerCase()
    let filterData = this.state.Product.filter((item) => {
      return item.username.toLowerCase().indexOf(stringKwd) !== -1
    })
    this.setState({
        Product: filterData,
    })
  }
  render() {
    return (
      <>
        <h3>Search</h3>
        <div className="input-group mt-3">
          <input
            type="text"
            className="form-control"
            placeholder="Find ..."
            ref={this.node}
            onClick={this.getVal}
            onChange={this.onChange}
          />
        </div>
        <div className="list-group">
          {this.state.Product.map((products) => {
            return (
              <a
                className="list-group-item list-group-item-action"
                key={products.id}
              >
                {products.name}
              </a>
            )
          })}
        </div>
      </>
    )
  }
}
export default LiveSearchFilter;