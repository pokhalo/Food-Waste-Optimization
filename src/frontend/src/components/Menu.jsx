
const Menu = () => {


    return (
        <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <div class="p-5">
                    <h2 class="title is-2">Food Waste Optimization</h2>
                    <h4 class="subtitle is-4">AI assisted model to forecast food consumption in YLVA restaurants</h4>             
                </div>            
                <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            <div class="navbar-end">
                <div id="navbarBasicExample" class="navbar-menu">
                    <div class="navbar-start">
                      <a class="navbar-item">
                        Home
                      </a>
                      <a class="navbar-item">
                        Documentation
                      </a>
                      <div class="navbar-item has-dropdown is-hoverable">
                        <a class="navbar-link">
                          More
                        </a>
                        <div class="navbar-dropdown">
                          <a class="navbar-item">
                            About
                          </a>
                          <a class="navbar-item">
                            Contact
                          </a>
                          <hr class="navbar-divider"></hr>
                          <a class="navbar-item">
                            Report an issue
                          </a>
                        </div>
                      </div>
                    </div>
                <div class="navbar-item">
                  <div class="buttons">
                    <a class="button is-info">
                      <strong>Sign up</strong>
                    </a>
                    <a class="button is-light">
                      Log in
                    </a>
                  </div>
                </div>
              </div>
            </div>
        </nav>
    )
}

export default Menu