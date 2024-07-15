import Select from "react-select";

export default function ArticleForm() {
  return (
    <div id="article-form" className="view-container">
      <form>
        <label>
          Article Title{" "}
          <input type="text" placeholder="Give it a title!"></input>
        </label>
        <label>
          Article Sub-title{" "}
          <input type="text" placeholder="Give it a sub title!"></input>
        </label>
        <label>
          Body{" "}
          <input type="textarea" placeholder="write your article here"></input>
        </label>
        <label>
          Add a preview image <input type="file"></input>
        </label>
        <Select options={[]} />
      </form>
    </div>
  );
}
