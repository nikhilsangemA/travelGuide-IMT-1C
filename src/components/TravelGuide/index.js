import {Component} from 'react'

import Loader from 'react-loader-spinner'
// import Cookies from 'js-cookie'

import './index.css'

const status = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  isProgress: 'ISPROGRESS',
}

class TravelGuide extends Component {
  state = {apiTravelData: [], activeStatus: status[0]}

  componentDidMount() {
    this.getApiTravelGuide()
  }

  getFetchData = dataOf => ({
    id: dataOf.id,
    name: dataOf.name,
    description: dataOf.description,
    imageUrl: dataOf.image_url,
  })

  getApiTravelGuide = async () => {
    this.setState({activeStatus: status.inProgress})
    // const getToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/tg/packages'
    const option = {
      method: 'GET',
      //   headers: {
      //     Authorization: `Bearer ${getToken}`,
      //   },
    }
    const fetchData = await fetch(url, option)
    const data = await fetchData.json()
    if (fetchData.ok === true) {
      const newData = data.packages.map(eachPack => this.getFetchData(eachPack))
      this.setState({apiTravelData: newData, activeStatus: status.success})
    } else {
      this.setState({activeStatus: status.failure})
    }
  }

  getLoader = () => (
    <div data-testid="loader">
      <Loader color="#00BFFF" type="TailSpin" height={50} width={50} />
    </div>
  )

  getLoad = () => this.getLoader()

  travelsList = travelsList => (
    <li key={travelsList.id} onClick={this.getLoad}>
      <img src={travelsList.imageUrl} alt={travelsList.name} />
      <h1>{travelsList.name}</h1>
      <p>{travelsList.description}</p>
    </li>
  )

  getSuccess = () => {
    const {apiTravelData} = this.state
    return (
      <div className="mainContainer">
        <h1 className="heading">Travel Guide</h1>
        <ul className="ul-list">
          {apiTravelData.map(eachTravel => this.travelsList(eachTravel))}
        </ul>
      </div>
    )
  }

  render() {
    const {activeStatus} = this.state
    switch (activeStatus) {
      case status.success:
        return this.getSuccess()
      case status.failure:
        return this.getFailure()
      case status.inProgress:
        return this.getLoader()

      default:
        return null
    }
  }
}

export default TravelGuide
