import {useRef, useState, useEffect} from 'react';

function Calendar(){
    let date = new Date();
    let months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const [datesList, setDatesList] = useState<Date[]>([])
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [startX, setStartX] = useState(0)
    const [scrollLeft, setScrollLeft] = useState(0)
    const [isDown, setIsDown] = useState(false)
    const sliderRef = useRef<HTMLDivElement>(null)
    const [bigMonth, setBigMonth] = useState(date.getMonth().toString())
    const [bigYear, setBigYear] = useState(date.getFullYear().toString())


        useEffect(()=>{
        const dates = [];
        for(let i = 0; i < 1401; i++){
            const date = new Date();
            date.setDate(date.getDate() - 700);
            dates.push(date);
            date.setDate(date.getDate() + i);
        }
        setDatesList(dates);
    },[]);

    

    const getCenterElement = () => {
        if (!sliderRef.current) return null;
        
        const container = sliderRef.current;
        const containerRect = container.getBoundingClientRect();
        const centerX = containerRect.left + (containerRect.width / 2);
        
        let closestElement: HTMLElement | null = null;
        let closestDistance = Infinity;
        
        Array.from(container.children).forEach((child) => {
            const element = child as HTMLElement;
            const rect = element.getBoundingClientRect();
            const elementCenter = rect.left + (rect.width / 2);
            const distance = Math.abs(elementCenter - centerX);
            

            if (distance < closestDistance) {
                closestDistance = distance;
                closestElement = element;
            }
        });
        setBigMonth(closestElement?.getAttribute('data-month'))
        setBigYear(closestElement?.getAttribute('data-year'))
        console.log(selectedDate)
        return closestElement;
    };

    const handleScroll = () => {
        const centerElement = getCenterElement();
        if (centerElement) {
            const dateAttr = centerElement.getAttribute('data-date');
            if (dateAttr) {
                const centerDate = new Date(dateAttr);
                if (centerDate.toDateString() !== selectedDate.toDateString()) {
                    setSelectedDate(centerDate);
                }
            }
        }
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setIsDown(true);
        setStartX(e.pageX - (sliderRef.current?.offsetLeft || 0));
        setScrollLeft(sliderRef.current?.scrollLeft || 0);
    };

    const handleMouseLeave = () => {
        setIsDown(false);
        centerCurrentDate();
    };

    const handleMouseUp = () => {
        setIsDown(false);
        centerCurrentDate();
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - (sliderRef.current?.offsetLeft || 0);
        const walk = (x - startX);
        if (sliderRef.current) {
            sliderRef.current.scrollLeft = scrollLeft - walk *15;
        }
    };

    const centerCurrentDate = () => {

        if (!sliderRef.current) return null;
        
        const container = sliderRef.current;
        const containerRect = container.getBoundingClientRect();
        const centerX = containerRect.left + (containerRect.width / 2);
        const centerElement = getCenterElement();
        if (!centerElement) return;
        const rect = centerElement.getBoundingClientRect();
        const elementCenter = rect.left + (rect.width / 2);
        const distance = elementCenter - centerX;
        if (sliderRef.current) {
            sliderRef.current.scrollLeft += distance;
        }
    }

    useEffect(() => {
    if (sliderRef.current && datesList.length > 0) {
        setTimeout(() => {
            const container = sliderRef.current;
            if (container) {
                container.scrollLeft = (container.scrollWidth - container.clientWidth) / 2;
                centerCurrentDate()
            }
        }, 0);
    }
}, [datesList]);

    return(
    <div className="relative w-full min-h-[80vh]"> 
        <div
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove} 
        onScroll={handleScroll}
        id="dateSlider" className="flex-none w-full h-44 bg-slate-800 rounded-tr-4xl flex overflow-x-auto items-center gap-10 cursor-grab active:cursor-grabbing select-none scrollbar-none"
        >
            {
                datesList.map((date, index) =>{
                    return(
                        <div key={index} data-date={date.toISOString()}  data-month={date.getMonth().toString()} data-year={date.getFullYear()} className="flex items-center justify-center flex-col">
                            {/* <p className="text-white font-mono font-light text-2xl mt-2.5">{months[date.getMonth()]}, {date.getFullYear()}</p> */}
                            <p className="text-white font-mono font-light text-5xl mt-2.5">{date.getDate()}</p>
                            <p className="text-white font-mono font-light text-3xl mt-0.5">{days[date.getDay()]}</p>
                        </div>);
                })
            }
        </div>
        <div className="absolute  top-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
            <div className=" text-center">
                <div className="text-white w-25 text-3xl font-bold mb-20 px-4 py-2 rounded-2xl font-mono">{months[+bigMonth]}</div>
                <div className='bg-black/60 h-25 w-25 rounded-2xl absolute pointer-events-none top-3/12 font-mono'></div>
                <div className="text-white w-25 text-xl mt-4 px-4 py-2 rounded-2xl font-mono">{bigYear}</div>
            </div>
        </div>
        <p className='text-white'>Выбрана дата: {selectedDate.toLocaleDateString()}</p>
        <div className='gap-5 flex flex-col w-full h-100 min-h-[70vh] items-center justify-top pt-5 pb-5 overflow-y-scroll scrollbar-none'>
            <div className='w-10/12 h-24 bg-slate-800 shrink-0 rounded-3xl '> </div>
            <div className='w-10/12 h-24 bg-slate-800 shrink-0 rounded-3xl '> </div>
            <div className='w-10/12 h-24 bg-slate-800 shrink-0 rounded-3xl '> </div>
            <div className='w-10/12 h-24 bg-slate-800 shrink-0 rounded-3xl '> </div>
            <div className='w-10/12 h-24 bg-slate-800 shrink-0 rounded-3xl '> </div>
            <div className='w-10/12 h-24 bg-slate-800 shrink-0 rounded-3xl '> </div>
            <div className='w-10/12 h-24 bg-slate-800 shrink-0 rounded-3xl '> </div>
            <div className='w-10/12 h-24 bg-slate-800 shrink-0 rounded-3xl '> </div>
        </div>
    </div>
    );
}export default Calendar;