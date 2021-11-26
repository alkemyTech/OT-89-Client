import apiService from "../services/server";

const uploadImage = async (image) => {
  //on response 200 returns imageUrl at AWS as string
  const formData = new FormData();
  formData.append("image", image);
  const config = {
    headers: { "Content-Type": "multipart/form-data" },
  };
  return await apiService
    .post(`/aws/upload`, formData, config)
    .then((res) => {
      if (res.status === 200) {
        res = res.data.data.Location;
      } else {
        console.log(res);
      }
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export default uploadImage;
