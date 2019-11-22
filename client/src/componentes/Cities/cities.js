import React, { Component } from "react";
import "./cities.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAllCities } from "../../store/actions/citiesActions";


class Cities extends Component {
  state = {
    cities: [],
    filteredCities: [],
    loading: true
  };

  async cargarPage(){
    await this.props.getCities()
      this.setState({
        cities: this.props.cities,
        filteredCities: this.props.cities,
        loading: false
      });
  }

  componentDidMount() {
    this.cargarPage()
  }

  filterCities = cityFilter => {
    let filteredCities = this.state.cities;

    filteredCities = filteredCities.filter(cities => {
      let name = cities.name.toLowerCase();
      return name.startsWith(cityFilter);
    });
    this.setState({
      filteredCities
    });
  };

  handleChange = e => {
    this.filterCities(e.target.value.toLowerCase());
  };

  render() {
    const { filteredCities, loading } = this.state;
    return (
      <div className="row m-0 p-0">
        <div className="col-12 p-0">
          <label htmlFor="filter">Filter by City name: </label>
          <input
            placeholder="Example: Rome"
            className="text-center CityInput"
            id="filter"
            onChange={this.handleChange}
          />
          <ul className="mx-0 mt-4 mb-2 p-0">
            {loading ? (
              <h5 style={{ textAlign: "center" }}>"Loading cities..."</h5>
            ) : filteredCities.length === 0 ? (
              "City no found =("
            ) : (
              <div className="CityListItem text-center m-1">
                {filteredCities
                  .sort((a, b) => {
                    if (a.name > b.name) {
                      return 1;
                    }
                    if (a.name < b.name) {
                      return -1;
                    }
                    return 0;
                  })
                  .map(city => {
                    return (
                      <Link to={`/cities/${city.country}/${city.name}`} key={city._id}>
                        <img
                          src={city.url}
                          alt={city.name}
                          className="imageList"
                        />
                        <h5>{city.name}</h5>
                      </Link>
                    );
                  })}
              </div>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cities: state.cityReducer.cities,
    loadingRedux: false
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCities: () => dispatch(getAllCities())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cities);

