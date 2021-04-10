export const Signup = () => {
    return (
      <form className="signup-form">
        
        <h1>Signup</h1>
        <div className="form-group">
           <label for="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control"  placeholder="Enter email" /> 
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Confirm Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Confirm Password" />
        </div>
        <button type="submit" className="btn btn-outline-info">SignUp</button>
      </form>
    );
  }