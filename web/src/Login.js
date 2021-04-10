export const Login = () => {
    return (
      <form className="login-form">
        
        <h1>Login</h1>
        <div className="form-group">
           <label for="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control"  placeholder="Enter email" /> 
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
        </div>
        <button type="submit" className="btn btn-outline-info">Login</button>
      </form>
    );
  }