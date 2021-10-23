import axios from 'axios'
import React, { Component } from 'react'

export default class Search extends Component {

    state = {
        keyword : "",
        photos:[],
        loader:""
    }

    handleInput = (e) => {
        this.setState({
            keyword: e.target.value,
        })
    }

    handleSubmit = async (e)  => {
        e.preventDefault();
        this.setState({loader:true})
        const res = await axios.get(`https://api.pexels.com/v1/search?query=${this.state.keyword}&per_page=20&page=1` , {
            headers:{
                Authorization : "563492ad6f91700001000001d6b64d79676c4dc2b2e7c09d74b30cf0"
            }
        })
        this.setState({loader: false})
        this.setState({photos : res.data.photos})
        
        console.log(this.state.photos)
    }

    render() {
        return (
            <>
                <form onSubmit={this.handleSubmit} className="container mt-3">
                    <div className="form-group">
                        <input 
                         type="text" 
                         name="keyword"
                         placeholder="Search image..."  
                         className="form-control"
                         value={this.state.keyword}
                         onChange={this.handleInput}
                        />
                    </div>
                    <div className="form-group">
                        <input 
                         type="submit"  
                         className="btn btn-info mt-2"
                         value="Search"
                        />
                    </div>
                </form>
                <div className="container mt-4">
                    <div className="row">
                    {!this.state.loader ? (
					this.state.photos.map((img) => (
                        <div key={img.id} className="col-md-3">
                            <img src={img.src.large} alt="not found" className="img-thumbnail mb-2"/>
                        </div>
                    ))
					) : (
					<div className="loader"><img src="https://miro.medium.com/max/1400/1*CsJ05WEGfunYMLGfsT2sXA.gif" alt="load" /></div>
				)}
                    </div>
                </div>
            </>
        )
    }
}
