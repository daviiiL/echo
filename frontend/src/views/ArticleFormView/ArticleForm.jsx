// import Select from "react-select";
import "../../assets/view/AddArticleForm.css";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import store from "../../store";
import { postArticle, updateArticle } from "../../store/article";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";
import { fetchArticleDetails } from "../../services/articleThunks";
import { CiEdit } from "react-icons/ci";
import { Button } from "@mui/material";
import ArticleEditor from "../../components/ArticleEditor";

export default function ArticleForm() {
  const { articleId } = useParams();
  const [loaded, setLoaded] = useState(false);

  const navigate = useNavigate();
  const dbErrors = useSelector((state) => state.articles?.errors);
  const articleDetails = useSelector((state) => state.articles.articleDetails);
  const [body, setBody] = useState("");
  const [header, setHeader] = useState("");
  const [subheader, setSubheader] = useState("");
  const [errors, setErrors] = useState({});
  useEffect(() => {
    const validateErrors = {};
    if (!body || !header || !subheader) validateErrors.fields = "empty";
    if (body && body.length < 40)
      validateErrors.body =
        "Please input at least 40 characters for your article";
    if (body && body.length > 60000)
      validateErrors.body = "Your article is too long";
    if (header && header.length < 4)
      validateErrors.title =
        "Please provide a title that is longer than 3 characters";
    if (subheader && subheader.length < 4)
      validateErrors.sub_title =
        "Please provide a sub-title that is longer than 3 characters";
    setErrors(validateErrors);
  }, [body, header, subheader]);

  useEffect(() => {
    if (articleId) {
      if (loaded == false) {
        store
          .dispatch(fetchArticleDetails(articleId))
          .then(() => setLoaded(true));
      } else {
        setBody(articleDetails.body);
        setHeader(articleDetails.title);
        setSubheader(articleDetails.sub_title);
      }
    } else {
      setBody("");
      setHeader("");
      setSubheader("");
    }
  }, [articleId, loaded, articleDetails]);

  const submitNewArticle = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length > 0) return;

    const article = {
      title: header,
      sub_title: subheader,
      body,
    };
    store
      .dispatch(postArticle(article))
      .then(unwrapResult)
      .then((res) => {
        if (res && res.article.id) navigate(`/articles/${res.article.id}`);
      });
  };

  const submitArticleUpdate = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length) return;
    const article = {
      title: header,
      sub_title: subheader,
      body,
      id: articleId,
    };
    store
      .dispatch(updateArticle(article))
      .then(unwrapResult)
      .then((res) => {
        if (res && res.article.id) navigate(`/articles/${res.article.id}`);
      });
  };

  const fillDemo = (e) => {
    e.preventDefault();
    setHeader("Introduction to React");
    setSubheader("What is react?");
    setBody(`React, also known as React.js or ReactJS, is a popular JavaScript library used for building user interfaces, primarily for single-page applications. Developed and maintained by Facebook (now Meta) and a community of individual developers and companies, React allows developers to create large web applications that can update and render efficiently in response to data changes. React was first released in 2013 and has since become one of the most widely used libraries for front-end development.

React follows a component-based architecture, where the UI is broken down into smaller, reusable components. Each component in React is a self-contained module that maintains its own state and logic, making it easier to manage and reason about. Components can be composed together to build complex user interfaces, and they can be reused across different parts of an application, promoting code reusability and maintainability.

One of the key features of React is its virtual DOM (Document Object Model). The virtual DOM is a lightweight copy of the actual DOM, and React uses it to optimize updates to the user interface. When the state of a component changes, React calculates the difference between the virtual DOM and the actual DOM and updates only the parts of the DOM that have changed. This approach minimizes the number of direct manipulations to the DOM, leading to improved performance and a smoother user experience.

React also introduces the concept of declarative programming, where developers describe what the UI should look like for a given state, and React takes care of updating the UI to match that state. This is in contrast to imperative programming, where developers need to write detailed instructions on how to update the UI. Declarative programming makes React code more predictable and easier to debug.

React can be used in conjunction with other libraries and frameworks. For instance, React Router is commonly used for handling routing in React applications, allowing developers to manage navigation and rendering of different components based on the URL. Redux is another popular library often used with React to manage application state, especially in larger applications where state management can become complex.

React is also not limited to web development. React Native, a framework derived from React, allows developers to build mobile applications for iOS and Android using the same principles and components as React. This enables code sharing between web and mobile applications, further enhancing development efficiency.

In summary, React.js is a powerful, flexible, and efficient library for building user interfaces. Its component-based architecture, virtual DOM, and declarative programming model make it a favorite among developers for creating dynamic and responsive web applications. Whether for web or mobile, React's extensive ecosystem and active community support continue to drive its popularity and adoption in the industry.`);
  };

  useEffect(() => {
    if (dbErrors) setErrors(dbErrors);
  }, [dbErrors]);

  if (articleId && !loaded) return <h1>loading</h1>;

  return (
    <div id="article-form-container" className="view-container">
      {articleId && (
        <p id="edit-article-title">
          edit mode <CiEdit />
        </p>
      )}
      <form id="article-form">
        <div id="article-form-title-container">
          {" "}
          <label>
            <input
              id="article-form-title"
              type="text"
              placeholder="TITLE"
              value={header}
              required
              onChange={(e) => setHeader(e.target.value)}
            ></input>
          </label>
          {errors?.title && (
            <p className="article-form-errors errors">{errors.title}</p>
          )}
        </div>
        <hr />
        <div id="article-form-sub-title-container">
          {" "}
          <label>
            <input
              id="article-form-sub-title"
              type="text"
              placeholder="SUBTITLE"
              value={subheader}
              required
              onChange={(e) => setSubheader(e.target.value)}
            ></input>
          </label>
          {errors?.sub_title && (
            <p className="article-form-errors errors">{errors.sub_title}</p>
          )}
        </div>
        <div id="article-form-body-container" className="w-full">
          {errors?.body && (
            <p className="article-form-errors errors">{errors.body}</p>
          )}
          {/* <ReactQuill
              theme="snow"
              modules={{ toolbar: true }}
              // formats={[]}

              value={body}
              onChange={setBody}
            /> */}
          <ArticleEditor />
        </div>

        {/* <label>
            Add a preview image <input type="file"></input>
          </label> */}
        {/* <Select options={[]} /> */}
        <div className="flex w-full ml-14 gap-x-5">
          <Button
            variant="contained"
            id="submit-button"
            type="submit"
            onClick={!articleId ? submitNewArticle : submitArticleUpdate}
          >
            Submit
          </Button>

          <Button
            id="cancel-button"
            type="button"
            onClick={() => {
              navigate(-1);
            }}
          >
            Cancel
          </Button>
          <Button id="fill-demo-button" type="button" onClick={fillDemo}>
            Fill Article Fields
          </Button>
        </div>
      </form>
    </div>
  );
}
