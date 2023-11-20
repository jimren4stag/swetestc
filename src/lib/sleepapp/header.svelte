<header>
  <div class="logo">
    <h1>sleepapp</h1>
  </div>

  <div class="navbar">
    <ul class="nav">
      <li><a href="/home">home</a></li>
      <li><a href="/tests">tests</a></li>
      <li><a href="/about">about</a></li>
      <li><a href="/login">login</a></li>
    </ul>
  </div>
</header>

<style>
  header {
    background-color: black;
    padding: 16px;
  }
  .navbar {
    display:flex;
    justify-content: flex-end;
  }
  ul.nav {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  ul.nav li {
    display: inline-block;
    margin-right: 10px;
  }
  ul.nav li a {
    text-decoration: none;
    padding: 5px 10px;
    border-radius: 5px;
    color: default;
  }
  
</style>
