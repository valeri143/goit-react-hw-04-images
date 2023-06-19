import { useState, useEffect } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { StyledApp, StyledLoad } from "./App.styled";
import { fetchData as fetchImageData } from "./helpers/api";

export const App = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isVisibleButton, setIsVisibleButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (query === "") {
      return;
    }
const splitedQuery = query.split('/', 2);
    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const data = await getImages(splitedQuery[1], page);
        // if(images !== data.hits){
          setImages((prevImages) => [...prevImages, ...data.hits]);
        // }
        setIsVisibleButton(
          // images.length + data.hits.length < data.totalHits
          page < Math.ceil(data.totalHits / data.per_page)
        );
      } catch (error) {
        console.error("Ошибка:", error.message);
        setIsVisibleButton(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  const getImages = async (query, page) => {
    try {
      const dataOfImages = await fetchImageData(query, page);
      if (dataOfImages.hits.length === 0) {
        window.alert("Упс! По вашему запросу нет изображений.");
        setIsVisibleButton(false);
        return;
      }
      return dataOfImages;
    } catch (error) {
      console.error("Ошибка:", error.message);
      throw error;
    }
  };

  const onSubmit = async (values, { resetForm }) => {
    setImages([]);
    setQuery(`${Date.now()}/${values.query}`);
    setPage(1);
    setIsLoading(false);
    resetForm();
  };

  const onClick = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <StyledApp>
        <Searchbar onSubmit={onSubmit} />
        <ImageGallery images={images} />
      </StyledApp>
      {isLoading && <StyledLoad />}
      {isVisibleButton && <Button onClick={onClick} />}
    </>
  );
};




// import { Component } from "react";
// import { Searchbar } from "./Searchbar/Searchbar";
// import { ImageGallery } from "./ImageGallery/ImageGallery";
// import { Button } from "./Button/Button";
// import { StyledApp, StyledLoad } from "./App.styled";
// import { fetchData } from "./helpers/api";

// export class App extends Component {
//   state = {
//     query: '',
//     images: [],
//     page: 1,
//     isVisibleButton: false,
//     totalHits: 0, 
//     isLoading: false
//   };

//   componentDidUpdate = async (_, prevState) => {
//     const {query, page} = this.state;
//     if(prevState.query !== query || prevState.page !== page){
//     const data =  await this.getImages(query, page)
//     this.setState({
//       images: [...this.state.images, ...data.hits],
//       isVisibleButton: (prevState.images.length + data.hits.length) < data.totalHits
//     })
//     }
//   }
  
//   getImages = async (query, page) => {
//     this.setState({isLoading: true})
//     try {
//       const dataOfImages = await fetchData(query, page)
//       if (dataOfImages.hits.length === 0) {
//         window.alert('Ooops there are no images on your request');
//         this.setState({ isVisibleButton: false });
//         return;
//       }
//       return dataOfImages;
//     } catch (error) {
//       console.error('Error:', error.message);
//       throw error;
//     }
//     finally{
//       this.setState({isLoading: false})
//     }
//   };

//   onSubmit = async (values, { resetForm }) => {
//     this.setState({
//       images: [],
//       query: values.query,
//       page: 1,
//       isLoading: false
//     });
//     resetForm();
//   };

//   onClick = async () => {
//     const nextPage = this.state.page + 1;
//      this.setState({page: nextPage });
//   };

//   render() {
//     const { images, isVisibleButton, isLoading } = this.state;
//     return (
//       <>
//       <StyledApp>
//         <Searchbar onSubmit={this.onSubmit} />
//         <ImageGallery images={images} />
//         </StyledApp>
//         {isLoading && <StyledLoad/>}
//         {isVisibleButton && <Button onClick={this.onClick} />}
       
//       </>
//     );
//   }
// }


