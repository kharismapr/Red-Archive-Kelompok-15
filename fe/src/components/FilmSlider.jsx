import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FilmCard from './FilmCard';

function FilmSlider({ title, films, viewMoreLink }) {
  const sliderRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Check if we can scroll in either direction
  const checkScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Add scroll event listener
  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('scroll', checkScroll);
      // Initial check
      checkScroll();
      return () => slider.removeEventListener('scroll', checkScroll);
    }
  }, []);

  // Scroll handler functions
  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -sliderRef.current.clientWidth, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: sliderRef.current.clientWidth, behavior: 'smooth' });
    }
  };

  return (
    <div className="py-8 px-4 bg-[#BE3C44]">
      <div className="mx-auto max-w-7xl">
        {/* Title and View More */}
        <div className="flex justify-between items-center mb-6 px-4">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          {viewMoreLink && (
            <Link to={viewMoreLink} className="text-white hover:text-gray-200 font-semibold">
              View More →
            </Link>
          )}
        </div>
        
        {/* Horizontal line - Border yang ditambahkan */}
        <div className="border-t border-white/30 mb-6 mx-4"></div>
        
        {/* Slider Container */}
        <div className="relative group">
          {/* Left Arrow Button */}
          {canScrollLeft && (
            <button 
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 z-10 transition-opacity opacity-0 group-hover:opacity-100"
              aria-label="Scroll left"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
           )}
          
          {/* Films Slider */}
          <div 
            ref={sliderRef}
            className="flex overflow-x-auto gap-4 pb-4 px-2 scrollbar-hide"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch' 
            }}
          >
            {films.map((film, index) => (
              <div key={index} className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
                <FilmCard film={film} />
              </div>
            ))}
          </div>
          
          {/* Right Arrow Button */}
          {canScrollRight && (
            <button 
              onClick={scrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 z-10 transition-opacity opacity-0 group-hover:opacity-100"
              aria-label="Scroll right"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
           )}
        </div>
      </div>
    </div>
  );
}

export default FilmSlider;
