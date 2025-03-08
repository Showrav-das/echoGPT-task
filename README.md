    <h1>Locally setup process:</h1>

  <p>If you clone this repository and execute the command npm run dev, the project will start running on your local machine. This allows you to test and interact with the application in a development environment.</p>
  <h1>Project Documentation</h1>

  <h2>Overview</h2>
  <p>
    This project is a web application built using <b>Next.js</b>, <b>Tailwind CSS</b>, <b>shadcn</b>, and <b>TypeScript</b>. It leverages the <b>Context API</b> for global state management and includes a mock server to simulate backend interactions. The application provides a user-friendly interface where users can interact with a chat-like system. Users can initiate new chats, input text, and receive responses from the mock server. The application also allows users to switch between previous chats seamlessly.
  </p>

  <h2>Technologies Used</h2>
  <ul>
    <li><b>Next.js</b>: A React framework for server-side rendering, static site generation, and building scalable web applications.</li>
    <li><b>Tailwind CSS</b>: A utility-first CSS framework for rapidly building custom user interfaces.</li>
    <li><b>shadcn</b>: A collection of reusable UI components designed for modern web applications.</li>
    <li><b>TypeScript</b>: A strongly typed superset of JavaScript that enhances code quality and developer productivity.</li>
    <li><b>Context API</b>: A React feature for managing global state without the need for external state management libraries.</li>
    <li><b>Mock Server</b>: A simulated backend server that provides predefined responses based on user input.</li>
  </ul>

  <h2>Features</h2>
  <ul>
    <li>
      <b>Blank Interface with a Button</b>:
      <p>When the application loads, the user is presented with a blank interface and a single button to initiate interaction.</p>
    </li>
    <li>
      <b>Input Box and Send Button</b>:
      <p>Upon clicking the button, an input box and a send button are displayed, allowing the user to enter text.</p>
    </li>
    <li>
      <b>Mock Server Interaction</b>:
      <p>When the user submits text, the application sends the input to the mock server, which responds with a predefined reply based on the input. If the input does not match any predefined keywords, a default response is returned.</p>
    </li>
    <li>
      <b>New Chat Creation</b>:
      <p>Users can start a new chat at any time, clearing the current conversation and beginning a fresh interaction.</p>
    </li>
    <li>
      <b>Chat History Navigation</b>:
      <p>Users can switch between previous chats and revisit past conversations seamlessly.</p>
    </li>
  </ul>
