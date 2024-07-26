// import Select from "react-select";
import "../../assets/view/AddArticleForm.css";
import { useEffect, useState } from "react";
import store from "../../store";
import { postArticle, updateArticle } from "../../store/article";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";
import { fetchArticleDetails } from "../../services/articleThunks";
import { CiEdit } from "react-icons/ci";
import { Button, TextField } from "@mui/material";
import ArticleEditor from "../../components/ArticleEditor";
import { useRef } from "react";
import notify from "../../components/Toaster/notify";

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
  const articleBody = useRef(null);

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
        if (!articleBody.current) articleBody.current = articleDetails.body;
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
    const submissionErrors = { ...errors };
    if (!header.length)
      submissionErrors.title = "Please provide a title for your article";
    if (!subheader.length)
      submissionErrors.sub_title =
        "Please provide a short description for your article";
    if (Object.keys(submissionErrors).length > 0)
      return setErrors(submissionErrors);

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
        notify({
          message: "your article is now online",
          icon: "👌",
          color: "green",
          position: "top-left",
        });
      });
  };

  const submitArticleUpdate = (e) => {
    e.preventDefault();
    const submissionErrors = { ...errors };
    if (!header.length)
      submissionErrors.title = "Please provide a title for your article";
    if (!subheader.length)
      submissionErrors.sub_title =
        "Please provide a short description for your article";
    if (Object.keys(submissionErrors).length > 0)
      return setErrors(submissionErrors);

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
        notify({
          message: "your article is now updated",
          icon: "👌",
          color: "green",
          position: "top-left",
        });
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
        <div id="article-form-title-container" className="mb-4">
          <TextField
            sx={{
              "& fieldset": { border: "none" },
            }}
            id="article-form-title"
            type="text"
            placeholder="TITLE"
            variant="outlined"
            value={header}
            required
            helperText={(errors?.title && errors.title) || " "}
            error={!!errors?.title}
            onChange={(e) => setHeader(e.target.value)}
          />
        </div>
        <div id="article-form-sub-title-container">
          <TextField
            sx={{
              "& fieldset": { border: "none" },
            }}
            id="article-form-sub-title"
            type="text"
            placeholder="SUBTITLE"
            helperText={(errors?.sub_title && errors.sub_title) || " "}
            error={!!errors?.sub_title}
            value={subheader}
            required
            onChange={(e) => setSubheader(e.target.value)}
          />
        </div>
        <div id="article-form-body-container" className="w-full">
          {errors?.body && (
            <p className="article-form-errors errors">{errors.body}</p>
          )}

          <ArticleEditor setBody={setBody} initialContent={articleBody} />
        </div>

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
