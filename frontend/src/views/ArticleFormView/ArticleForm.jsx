import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import {
  List,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  ListItem,
  Divider,
  ListItemAvatar,
} from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import { useEffect, useRef, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "../../assets/view/AddArticleForm.css";
import ArticleEditor from "../../components/ArticleEditor";
import notify from "../../components/Toaster/notify";
import { fetchArticleDetails } from "../../services/articleThunks";
import store from "../../store";
import { postArticle, updateArticle } from "../../store/article";
import DemoData from "./DemoData";
import LightbulbCircleIcon from "@mui/icons-material/LightbulbCircle";
import StarIcon from "@mui/icons-material/Star";

export default function ArticleForm() {
  const { articleId } = useParams();
  //for short curcuiting this component while things load
  const navigate = useNavigate();

  const dbErrors = useSelector((state) => state.articles?.errors);
  const articleDetails = useSelector((state) => state.articles.articleDetails);

  const [loaded, setLoaded] = useState(false);
  const [body, setBody] = useState("");
  const [header, setHeader] = useState("");
  const [subheader, setSubheader] = useState("");
  const [errors, setErrors] = useState({});
  //using useRef to not cause useEffect in article editor to trigger too many rerenders
  const articleBody = useRef(null);
  //for modal visibility
  const [open, setOpen] = useState(false);
  //fillerLoaded is used to populate article editor content with demo filler
  //the state variable is added to article editor useEffect to rerun content population when filler is added
  const [fillerLoaded, SetFillerLoaded] = useState(false);

  useEffect(() => {
    //form validations
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
    //article editing content prepopulation
    if (articleId) {
      if (loaded == false) {
        //load existing article details
        store
          .dispatch(fetchArticleDetails(articleId))
          .then(() => setLoaded(true));
      } else {
        //populate state values
        if (!articleBody.current) articleBody.current = articleDetails.body;
        setBody(articleDetails.body);
        setHeader(articleDetails.title);
        setSubheader(articleDetails.sub_title);
      }
    }
  }, [articleId, loaded, articleDetails]);

  const postSubmission = (e) => {
    //modal submission
    e.preventDefault();
    const article = {
      title: header,
      sub_title: subheader,
      body,
    };
    if (articleId) article.id = articleId;
    store
      .dispatch(articleId ? updateArticle(article) : postArticle(article))
      .then(unwrapResult)
      .then((res) => {
        if (res && res.article.id) {
          navigate(`/articles/${res.article.id}`);
          notify({
            message: `your article is now ${articleId ? "updated" : "online"}`,
            icon: "👌",
            color: "green",
            position: "top-left",
          });
        }
      });
  };

  const stageSubmission = (e) => {
    //additional validations && triggers submission modal
    e.preventDefault();
    const submissionErrors = { ...errors };
    if (!header.length)
      submissionErrors.title = "Please provide a title for your article";
    if (!subheader.length)
      submissionErrors.sub_title =
        "Please provide a short description for your article";
    if (!body.length) submissionErrors.body = "Your article is too short";
    if (Object.keys(submissionErrors).length > 0)
      return setErrors(submissionErrors);
    return setOpen(true);
  };

  const fillDemo = (e) => {
    e.preventDefault();
    setHeader(DemoData.header);
    setSubheader(DemoData.subheader);
    setBody(DemoData.body);
    articleBody.current = DemoData.body;
    //rerenders article editor with demo content
    SetFillerLoaded(true);
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

          <ArticleEditor
            setBody={setBody}
            initialContent={articleBody}
            fillerLoaded={fillerLoaded}
          />
        </div>

        <div className="flex w-full ml-14 gap-x-5">
          <Button
            variant="contained"
            id="submit-button"
            type="submit"
            onClick={stageSubmission}
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
        <Dialog
          open={open}
          PaperProps={
            {
              // sx: { height: "500px" },
            }
          }
        >
          <DialogTitle>Almost there!</DialogTitle>
          <DialogContent>
            <Accordion>
              <AccordionSummary
                expandIcon={<ArrowDownwardIcon style={{ color: "white" }} />}
                sx={{
                  backgroundColor: "#1976D2",
                  borderRadius: "5px",
                  color: "white",
                }}
              >
                <Typography className="flex place-items-center justify-items-centern">
                  <LightbulbCircleIcon />
                  Tips after posting your article
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  backgroundColor: "#E2E8F0",
                }}
              >
                <List>
                  <ListItem>
                    <ListItemAvatar>
                      <StarIcon />
                    </ListItemAvatar>
                    <Typography className="flex justify-center">
                      add tags to your article
                    </Typography>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemAvatar>
                      <StarIcon />
                    </ListItemAvatar>
                    <Typography className="flex justify-center">
                      manage your article easily
                    </Typography>
                  </ListItem>
                </List>
              </AccordionDetails>
            </Accordion>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="contained" onClick={postSubmission}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </div>
  );
}
