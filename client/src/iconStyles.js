import { grey, red } from "@mui/material/colors";

export const editIconSx = (value) => ({
  color: grey[800],
  fontSize: 18,
  marginRight: value ? value : 0,
  cursor: "pointer"
});

export const deleteIconSx = {
  color: red[500],
  fontSize: 18,
  cursor: "pointer"
};

export const doneIconSx = {
  backgroundColor: "#74eb75",
  color: "#fff",
  marginRight: 3,
  cursor: "pointer",
  borderRadius: 100,
  ":hover": {
    backgroundColor: "#3ed641",
  }
};

export const closeIconSx = {
  backgroundColor: "#fd5b5b",
  color: "#fff",
  cursor: "pointer",
  borderRadius: 100,
  ":hover": {
    backgroundColor: "#f53434",
  }
}

export const addIconSx = {
  backgroundColor: "#e9e9e9",
  borderRadius: 100,
  color: "#808080",
  cursor: "pointer",
  ":hover": {
    color: "#494949",
  }
}

export const arrowDropIconSx = {
  backgroundColor: "#e9e9e9",
  color: "#808080",
  borderRadius: 100,
  cursor: "pointer",
  marginTop: 1,
  marginBottom: 1,
  ":hover": {
    color: "#494949"
  }
}

export const moreVertIconSx = {
  color: "#4d4d4d",
  cursor: "pointer",
  ":hover": {
    backgroundColor: "#eeeeee",
    borderRadius: 100,
  } 
}

export const timerIconSx = {
  marginRight: 1,
}

export const favoriteIconSx = (color, colorHover) => ({
  marginRight: 1,
  color: color ? color : "#fd7b7b",
  cursor: "pointer",
  ":hover": {
    color: colorHover ? colorHover : "#ff0000",
  }
})

export const localDiningIconSx = {
  marginRight: 1,
  color: "#f55e8b" 
}

export const formatListNumberedIconSx = {
  marginRight: 1,
  color: "#6784ff"
}