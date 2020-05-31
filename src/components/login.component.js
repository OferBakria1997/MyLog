import React, { Component } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";




export default class Login extends Component {
    constructor(props){
        super(props)
    this.onChangeUsername=this.onChangeUsername.bind(this);
    this.onChangePassword=this.onChangePassword.bind(this);
    this.onSubmit=this.onSubmit.bind(this);

    this.state = {
        username:'',
        password:'',
      }
    }
onSubmit(e) {
    e.preventDefault();

    const user = {
        username: this.state.username,
        password: this.state.password
    }

    axios.post('http://localhost:5001/user/login', user)
        .then( res => localStorage.setItem('token', JSON.stringify(res.data)))
        .then(()=> JSON.parse(localStorage.getItem('token')).message==="auth succesfull" ? this.props.history.replace('/aboutme'):this.props.history.replace('/login'))

    
    this.setState({
        username: '',
        password: ''

    })
    }

    onChangeUsername(e) {
    this.setState({
        username: e.target.value
    })
    
    }
    onChangePassword(e) {
    this.setState({
        password: e.target.value
    })
    }
  render() {
    return (
    <div className="row">
        <div className="col-lg-5 m-auto">
            <div className="card mt-5 bg-dark">
                <div className="card-title text-center mt-3">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMoAAAD5CAMAAABRVVqZAAAAilBMVEX39/cAAAD////6+vrf39+goKDy8vJwcHDZ2dmqqqrm5uaZmZnv7+/19fXPz8+MjIy4uLjHx8eFhYXp6elPT0/BwcF7e3uysrJ1dXUjIyMzMzM4ODjKysqUlJRUVFSrq6srKytnZ2eJiYkUFBRERERhYWEMDAxAQEAcHBxJSUkTExNiYmIlJSUuLi4lD6hzAAALKklEQVR4nO1d6XrqKhQ1G4eoMU61trW21Q6n59z2/V/vZpYAm0ACQvtl/bqn02UJe2BPDAY9evTo0aOHHyAJoEDyn66X0xYJB7INd/v58ZxgOX/ehVFKyPW6dEGAxMen14DB991+BuB6cToAiG9ZFhXephH8lK2BxfQeJZJhEv4IMjA+ynlkuIm9J0NgpEAkxfvMb5mB8EGRSYK5xxtDYKlOJMFh6OvGkOivFpMEKz+5QPihyyQIjj5ygbU+kQQT/7jArhWTIDj5xqXlnni4LyRuzSQINj5xIdsOTIJg6hEXOHSiEoTe2ErA3WA1fC5cUyhA2ot8CW9En7th6WPtxRGDc3cmwacP20KGBpgEwcgDLvBuhEowdk1kQEIzTDxwLOE/Q1ScbwuZmWLi3OZr3htleHBMhbS4bmFw674YMPQXuPWQYWKQSuD2hJlkEsQOTxh5NErFpWkBlZiqOp5cUrkxSuWfwwMGBlVxiq07LmOzTBxalo7RCR47d1TMXFUu2LujYsrBLzH9PVTcXSWNU5n/HiruzH2/Kzh+kaw41GC/yK6YtvYOw62/xwcbwD+zVCJnTAbwZJTJq8v7yu+5RXbKpvJwGjYmRqm4jLgM4M4kFadxMKPRyaXbkB4xqI6HbvORRhKROW5cR/LNuWHuYhQFTKUigy/XTMyZFtdJr4Ex5+XT+aYYk5a9+00xUKyTwnUissDYQBDcqc9yAWlbNnnBrR+bYuCI3btmcAG8daPi2GWhQaJOJWE7X45Xik4a2QPjSAPaR/d8qASroTUXz/YkRUsuXvZKkFlDh5cAH6GPTBIuC900/t/IHy1cB9GMi/ncITWAofrG/PH0cJUgsFNsXHv2eUtyJGQU3Jjjwu8tKUAglpe5HqY/g0gKArPjC8LjdfMzum4rEIDhdPLN0Pg6jULys4hkSIcGDKJhvF7vdrv1Og63i3SAgOtltQeh4HotPXr06CFAN+3kjW5LzAeZrcR1ENRAmnwmjeinyHYaL9wbnNSoP5/SyNGMXwpEj6vpaF5gNJruV2vBXYukra43o6FLNunYmXPpm7xzDqLwHsY3DVZzOV6OoSM2qcv4SS2SO2LCkOWBo7KgvvtynF2fDIHwVF/kH3aRZCWg8swRZjqsnh6vTAZmJ26VXGhOkA/75vjyIac/6yuSIUQYjmCD2ILKNy6NQkTX56erDUWBofj6/sZtC5t44bq5sAa+KwVfQSQDGbjKIdjUvs/JPJ5efh9c4ZDJhho9ckL9h/42a3tIhKf+Huz3ssAcZxIErAWsNbM+K+iFC+5tRy7hWcYk+Mut9vLzXA1eQyzzYJdKY+0EL9hVuJJVcI1DbOwOq1k05rXZUoLKcLBJYIVEmc2yBJWiPNaBKQWCkXmy+Gr+W/b61pVq8D/GzJpzaWGNjlJpjL26PbXKHEa8C/FiVqWYvrC1LaqNEXVLWejjuv1WnfZky+orl6/WLGVBpdbPodyX8GKJinozAW3dCk1V+3zVqy/sNBxoVOXQ4lLU756pL2lMgbDTMqVTlEPtAdlnX6HsnU5rO+c+mKGiMVKSOhiFrqK8Yq36MRtM9CYePFyonPKvAPsFNdgQFs2JLZVsQBGTKa09ft0RYmWDimYVbnn3LSMqpYbWbKqyIfe6ZYVFCXRlV4tYi97xslOKWGgideT+fvVrxT916yz5UGF3KE/3rZBJbNV/UHQP6JbzceE1E1SkN2ERMv1buaBZT5r+iKQvG1T02ztSQwnVv7akTV2ijcl0bSpwt4RyHBMV1mZYigVl3Ga80QmoDqoRgK7mSGHhyqKrRTPElIRNYCH5SRQWOlhb9dw8UL/13a5dzxcqwZIKRmirwARvNgrDDfcLq2FqJT9heFSTCm7Eo/QvydqWuWXQHrfeFaItSUnM1vvRcrPZpI+HDBctHg+5NpUDtyUJjfH6yJ7z+8lUt8bsygfsjv2sCcxGqLhOVmMNNtelwlbqw2Df8P+fqD+4cVUq63pUECIVN/SwUiRjrC1VAfViathumn8lw6caGXNzZRtRM4tIOhrBm0pJeSsfrBVqTOBRs/9i2bwxZgd/SkB/roToXy0eGrP+RppSFUBLPAz1W2KC5myZwXG/MtBh8tZPbjQMrtUPU7QBPTBfP5pQQV7BoB08aoMXagWgqoJFOIwlXIwOB8FAKa9OTJIPRcLF+FwzAShB6SyaMi6mJ2jxoMJ3MO381w64vJgc8y3GJQHREGs/TeNttA1XZ6muxqdBdW3fbsQl0i1Nu35MB9n1MbtMxrJr+hnjYt1GXiJesk9tM6AXSGAnOSxYyzjpfnyluGRSZAaFWx3IHkZDCrEMDwPjUL2MI4ssCxxfQvBDhqU0WgUXlUFtCv4xr0VLIwR/KgnJ/9mNhFVnQVifnIMqlKHjRhIt8SreFateGKW+0GzS/SXtDNtwdomzSOLq4qF2Bl/14FHZFMkHVjrvhIyyrsvNtkpD40dMHHO2aFmoCgV0Uz4KtiSqFl7qM7VDSW+LvAa0C6pgkcQBL88gLeVlCj3C/7T4zTB7blhVVSw5KoU2qp3AUqzrBc01cB0N+S90c7xxVO6SzHgVNwCgW00UygHEOWbjo3JLVIVvsmBILsCM8ily6LIPWVwmY8sPq8pdZWY4XzRbxFDsiiRYhgi+nW2pzoBEE1VUGFcwd0JlbhtStWjHTFZ2TBo3BOGio+Z1IUlAKzGkS92o7KdAeJRy3Se1E9hIcRgancuaobypyJ1vEH6WuZhJTyb6hCOBxW6jU3zYiOowy69EUiqy6N+9JMKXzjeIp5ubT8nva6C6VUjt1qeUinQ/G3L/WZo2Gq6fj3dPD90iGFXMSJrDOcmoyC9TSkMHi8QziWbDeLfaT0fz4/J83iS4TXGXYELh7u72Nv3m5rw8HudpK+4unF0u68DO5bjgoxo8vxjXUC5E0N5YQW/+fjF+ArTAjqzARwq/ilP49AIk5tvBWxW4u6pQo0tw79jBLEh8MSqlLgTVQg7eBe9GBb8f2KgllUPi4XFUBOUteKTm+gOsJcEDhgqBcLWOlHuu7DQpyKC8KxBn3samzg/3RR2MFVeUlaprpC4D+LXt+rKiLPZVUKZm+3DD4kCD4XaFpkJ5wbVecdyDc2BX8GwUTYVeMl26i1NxYO0BG/VWp0IdJNrnxak4eAMJV6fIAauVueOl9g7GceOCW9dgVQpypEbFwcNBeLChTqW8Z9VvumjYQXaLtAW8zIExkUWoop6fQ6mgd3ubQA1LnUoRI/9grD1GxckjbqhHyFDJd4+J1aGy4mRKOiosDJW8SOVbjQo30ucqQJPDSlQQu+Lo4SAsscZQyRk/qFFx9BwdlvRijnuuHg5KVGz08KlBiUr+nhhzDUEMrLNHKBGNylCBzM1nHF7kviLORV4ByE2S3ZUscM+4VuKibrT8yD7EJ54bzfP4PmHrXcTOqMOh7+LIHB9x4UcICrWf0yfchLk4pTiYKOLsTFLyJQlGCAnGWvIQMHH8mpMoV6IwmwYEv3b9ABi7KIHkjxrTAqFgM90/tyOae7gZCZCNTD0uN7enJ1Hsm5sT54CKmXItJ1cuFqrjnaSwPMFOFQaqv//58iJK91IH9yJfoisXf5jIi4l+FpNOpUFfSt7BFdFaj90sPGOS9qnilZQSKLRGXh+E6Fdr/hNWu3sAiNFEhRh3soY1tyBaPYUPfj9LBZFq8enn3kcpoUFgpiIyh70vLzrIQGA8apAZjSkIrgEQb9Cs6397ndkU7kGSm+Jowhbf35/m8eBH8ciRlc5Fs/Bxt0qxi4dR/ypVjx49evTo0aNHjx49evTo0aNHjx6/Fv8DuYqblwCfgwAAAAAASUVORK5CYII=" alt="mac computer" width="150px" height="150px"></img>
                </div>
                <div className="card-body">
                    <form onSubmit={this.onSubmit}>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="fa fa-user fa-2x">Username:</i>
                                </span>
                            </div>
                            <input type="text" className="form-control py-4" placeholder="User Name"
                            required
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                            />
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="fa fa-lock fa-2x">Password:</i>
                                </span>
                            </div>
                            <input type="password" className="form-control py-4" placeholder="User Password"
                            required
                            value={this.state.password}
                            onChange={this.onChangePassword}
                            />
                        </div>
                        <button type="submit" className="btn btn-success">Login Now</button>
                        <p className="float-right text-white">
                            <input type="checkbox"/>Remember Me
                        </p>
                    </form> 
                </div>
            </div>
        </div>
    </div>
    );
   }
}