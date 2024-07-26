import toast from "react-hot-toast";

export default function notify(args) {
  const colors = {
    error: {
      background: "#a31818",
      color: "white",
    },
    white: {
      background: "white",
      color: "black",
    },
    site: {
      background: "#E2E8F0",
      color: "black",
    },
    green: {
      background: "green",
      color: "white",
    },
  };
  console.log(args);
  const options = {};
  if (args.position) options.position = args.position;
  options.style = args.color ? colors[args.color] : args.white;
  if (args.icon) options.icon = args.icon;
  return toast(args.message, options);
}
