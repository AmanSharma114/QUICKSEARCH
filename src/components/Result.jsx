import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactPlayer from 'react-player';

import { useStateContext } from '../contexts/StateContextProvider';
import { Loading } from './Loading';

export const Results = () => {
  const { results, loading, getResults, searchTerm } = useStateContext();
  const location = useLocation();

  useEffect(() => {
    if (searchTerm !== '') {
      if (location.pathname === '/videos') {
        getResults(`/search/q=${searchTerm}&tbm=vid`);
      } else {
        getResults(`/search/q=${searchTerm}&tbm=${location.pathname.slice(1)}`);
      }
    }
  }, [searchTerm, location.pathname]);

  if (loading) return <Loading />;

  switch (location.pathname) {
    case '/search':
      return (
        <div className="sm:px-56 flex flex-wrap justify-between space-y-6">
          {results && results.organic_results && results.organic_results.map(({ link, title }, index) => (
            <div key={index} className="md:w-2/5 w-full">
              <a href={link} target="_blank" rel="noopener noreferrer">
                <p className="text-sm">{link && link.length > 30 ? link.substring(0, 30) : link}</p>
                <p className="text-lg hover:underline dark:text-blue-300 text-blue-700">{title}</p>
              </a>
            </div>
          ))}
        </div>
      );
    case '/images':
      return (
        <div className="flex flex-wrap justify-center items-center">
          {results && results.image_results && results.image_results.map(({ image, link: { href, title } }, index) => (
            <a href={href} target="_blank" rel="noopener noreferrer" key={index} className="sm:p-3 p-5">
              <img src={image && image.src} alt={title} loading="lazy" />
              <p className="sm:w-36 w-36 break-words text-sm mt-2">{title}</p>
            </a>
          ))}
        </div>
      );
    case '/news':
      return (
        <div className="sm:px-56 flex flex-wrap justify-between items-center space-y-6">
          {results && results.news_results && results.news_results.map(({ id, link, source, title }) => (
            <div key={id} className="md:w-2/5 w-full">
              <a href={link.href} target="_blank" rel="noopener noreferrer" className="hover:underline">
                <p className="text-lg dark:text-blue-300 text-blue-700">{title}</p>
              </a>
              <div className="flex gap-4">
                <a href={source && source.href} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-blue-300">
                  {source && source.href}
                </a>
              </div>
            </div>
          ))}
        </div>
      );
    case '/videos':
      return (
        <div className="flex flex-wrap">
          {results && results.video_results && results.video_results.map((video, index) => (
            <div key={index} className="p-2">
              <ReactPlayer url={video.additional_links && video.additional_links[0].href} controls width="355px" height="200px" />
            </div>
          ))}
        </div>
      );
    default:
      return 'Error...';
  }
};
