import React from "react"
import CardBig from "../CardBig/CardBig"
import CardMini from "../CardMini/CardMini"
import '../Catalog/Catalog.css'


function Catalog() {
    const [search, setSearch] = React.useState()
    const [arrGoods, setArrGoods] = React.useState([])
    const [filteredArrGoods, setFilteredArrGoods] = React.useState([])
    const [lowPrice, setLowPrice] = React.useState(0)
    const [highPrice, setHighPrice] = React.useState(0)
    const [brands, setBrands] = React.useState([])
    const [sizes, setSizes] = React.useState([])
    const [colors, setColors] = React.useState([])
    const [selectedSizes, setSelectedSizes] = React.useState([])
    const [selectedColors, setSelectedColors] = React.useState([])
    const [selectedBrands, setSelectedBrands] = React.useState([])
    const [maxPrice, setMaxPrice] = React.useState(0)
    const [minPrice, setMinPrice] = React.useState(0)
    let brandsArr = []
    let sizesArr = []
    let colorsArr = []
    let min = 0
    let max = 0

    React.useEffect(() => {
        localStorage.removeItem('lastPage')
    }, [])

    function onLoad() {
        fetch('http://localhost:3000/catalog', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": localStorage.getItem('jwt') ? localStorage.getItem('jwt') : ''
            },
        })
            .then((res) => {
                return res.json()
            })
            .then((res) => {
                setArrGoods(res.data)
                setFilteredArrGoods(res.data)
                let pricearr = []
                res.data.forEach((item) => {
                    let sizesAndPricesArr = []
                    item.sizesNprices.sort().forEach((item) => {
                        sizesAndPricesArr = [...sizesAndPricesArr, item.split(' - ')[0]]
                        pricearr.push(+item.split(' - ')[1])
                    })
                    setMinPrice(pricearr.sort((a, b) => {
                        return a - b
                    })[0])
                    setMaxPrice(pricearr.sort((a, b) => {
                        return a - b
                    })[pricearr.length - 1])
                    setLowPrice(pricearr.sort((a, b) => {
                        return a - b
                    })[0])
                    setHighPrice(pricearr.sort((a, b) => {
                        return a - b
                    })[pricearr.length - 1])
                    sizesArr = [...sizesArr, sizesAndPricesArr]
                    brandsArr.push(item.brand)
                    colorsArr.push(item.color)
                })

                let allSizes = []
                sizesArr.forEach((arr) => {
                    allSizes = [...allSizes, ...arr]
                })
                let newSizes = new Set(allSizes)
                allSizes = [...newSizes]
                setSizes(allSizes)

                let newBrands = new Set(brandsArr)
                brandsArr = [...newBrands]
                setBrands(brandsArr)

                let allColors = []
                colorsArr.forEach((arr) => {
                    allColors = [...allColors, ...arr]
                })
                let newColors = new Set(allColors)
                allColors = [...newColors]
                setColors(allColors)
            })
            .catch(err => console.log(err))
    }

    React.useEffect(() => {
        onLoad()
    }, [])

    function handleClickSize(e) {
        if (e.target.checked) {
            setSelectedSizes([...selectedSizes, e.target.value])
        } else {
            setSelectedSizes(selectedSizes.filter(size => size != e.target.value))
        }
    }

    function handleClickColor(e) {
        if (e.target.checked) {
            setSelectedColors([...selectedColors, e.target.value])
        } else {
            setSelectedColors(selectedColors.filter(color => color != e.target.value))
        }
    }

    function handleClickBrands(e) {
        if (e.target.checked) {
            setSelectedBrands([...selectedBrands, e.target.value])
        } else {
            setSelectedBrands(selectedBrands.filter(brand => brand != e.target.value))
        }
        console.log(selectedBrands)
    }

    function handleResetForm(e) {
        e.preventDefault()
        e.target.closest('.filter').reset()
        setSelectedBrands([])
        setSelectedColors([])
        setSelectedSizes([])
        setHighPrice(maxPrice)
        setLowPrice(minPrice)
    }

    React.useEffect(() => {
        let newArr = []
        if (selectedSizes.length != 0 || selectedColors.length != 0 || selectedBrands != 0) {
            arrGoods.map((item) => {
                let checkSize
                let checkColor
                let checkBrand
                let check
                if (selectedSizes.length != 0) {
                    item.sizesNprices.forEach((i) => {
                        if (selectedSizes.indexOf(i.split(' - ')[0]) != -1) {
                            checkSize = true
                            check = true
                        }
                    })
                    if (checkSize == undefined) {
                        check = false
                    }
                }
                if (selectedColors.length != 0) {
                    if (check == true || check == undefined) {
                        item.color.forEach((i) => {
                            if (selectedColors.indexOf(i) != -1) {
                                checkColor = true
                                check = true
                            }
                        })
                        if (checkColor == undefined) {
                            check = false
                        }
                    }
                }
                if (selectedBrands.length != 0) {
                    if (check == true || check == undefined) {
                        if (selectedBrands.indexOf(item.brand) != -1) {
                            checkBrand = true
                            check = true
                        }
                        if (checkBrand == undefined) {
                            check = false
                        }
                    }
                }
                if (check) newArr.push(item)
            })
            let newArr2 = []
            newArr.map((item) => {
                let pricesArr = []
                item.sizesNprices.forEach((i) => {
                    pricesArr.push(i.split(' - ')[1])
                })
                let min = pricesArr.sort((a, b) => { return a - b })[0]
                let max = pricesArr.sort((a, b) => { return a - b })[pricesArr.length - 1]

                if (+min <= highPrice && +max >= lowPrice) {
                    newArr2.push(item)
                }
            })

            setFilteredArrGoods(newArr2)
        } else {
            let newArr = []
            arrGoods.map((item) => {
                let pricesArr = []
                item.sizesNprices.forEach((i) => {
                    pricesArr.push(i.split(' - ')[1])
                })
                let min = pricesArr.sort((a, b) => { return a - b })[0]
                let max = pricesArr.sort((a, b) => { return a - b })[pricesArr.length - 1]

                if (+min <= highPrice && +max >= lowPrice) {
                    newArr.push(item)
                }
            })

            setFilteredArrGoods(newArr)
        }
    }, [selectedSizes, selectedColors, selectedBrands, highPrice, lowPrice])

    const [clickedBurger, setClickedBurger] = React.useState(false)

    function handleClickBurger() {
        setClickedBurger(!clickedBurger)
    }

    return (
        <>
            <div className="top-cards">
                {
                    arrGoods != undefined ?

                        arrGoods.map((item, i) => {
                            if (i < 2) {
                                let bestPrice = []
                                item.sizesNprices.forEach((i) => {
                                    bestPrice.push(i.split(' - ')[1])
                                })
                                return (
                                    <CardBig
                                        id={item.article}
                                        name={item.brand + ' ' + item.name}
                                        price={bestPrice.sort((a, b) => { return a - b })[0]}
                                        photo={item.thumbnail}
                                        key={item.brand + ' ' + item.name} />
                                )
                            }
                        }) : false
                }
            </div>
            <form action="" className="search">
                <input type="text" className="search__input" required min='1' step='any' placeholder='Поиск' value={search} onChange={e => setSearch(e.target.value)} onFocus={e => setSearch('')} />
                <button type="submit" className="search__btn">&#128269;</button>
            </form>
            <div className={"filter__back" + (clickedBurger == true ? ' filter__back_active' : '')}  onClick={handleClickBurger}></div>
            <div className="catalog">
                <button className={"filter__burger" + (clickedBurger == true ? ' filter__burger_active' : '')} onClick={handleClickBurger}></button>
                <div className={"filter__cont" + (clickedBurger == true ? ' filter__cont_active' : '')}>
                    <form action="" className="filter">
                        <h5 className="filter__header">Фильтры</h5>
                        <button className="filter__btn hover7" onClick={handleResetForm}>&#9747; Сбросить фильтры</button>
                        <div className="filter__section">
                            <p className="filter__name">Цена</p>
                            <div className="filter__prices">
                                <div className="filter__price-cont">
                                    <p className="filter__price">От:</p>
                                    <input type="number" className="filter__price-input search__input" placeholder={minPrice} value={lowPrice} onChange={(e) => setLowPrice(e.target.value)} />
                                </div>
                                <div className="filter__price-cont">
                                    <p className="filter__price">До:</p>
                                    <input type="number" className="filter__price-input search__input" placeholder={maxPrice} value={highPrice} onChange={(e) => setHighPrice(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className="filter__section">
                            <p className="filter__name">Размер (EU)</p>
                            <div className="filter__checkboxes">
                                {
                                    sizes != undefined ?
                                        sizes.map((item) => {
                                            return (
                                                <label htmlFor="" className="filter__label" key={item}>
                                                    <input type="checkbox" onChange={handleClickSize} value={item} />
                                                    <div className="filter__checkbox">
                                                        <span className="filter__checked"></span>
                                                        <p className="filter__price">{item}</p>
                                                    </div>
                                                </label>
                                            )
                                        }) : false
                                }
                            </div>
                        </div>
                        <div className="filter__section">
                            <p className="filter__name">Цвет</p>
                            <div className="filter__checkboxes">
                                {
                                    colors != undefined ?
                                        colors.map((item) => {
                                            return (
                                                <label htmlFor="" className="filter__label" key={item}>
                                                    <input type="checkbox" onChange={handleClickColor} value={item} />
                                                    <div className="filter__checkbox">
                                                        <span className="filter__checked"></span>
                                                        <p className="filter__price">{item}</p>
                                                    </div>
                                                </label>
                                            )
                                        }) : false
                                }
                            </div>
                        </div>
                        <div className="filter__section">
                            <p className="filter__name">Бренд</p>
                            <div className="filter__checkboxes">
                                {
                                    brands != undefined ?
                                        brands.map((item) => {
                                            return (
                                                <label htmlFor="" className="filter__label" key={item}>
                                                    <input type="checkbox" onChange={handleClickBrands} value={item} />
                                                    <div className="filter__checkbox">
                                                        <span className="filter__checked"></span>
                                                        <p className="filter__price">{item}</p>
                                                    </div>
                                                </label>
                                            )
                                        }) : false
                                }
                            </div>
                        </div>
                    </form>
                </div>
                <div className="catalog__cards">
                    {
                        filteredArrGoods != undefined ?
                            filteredArrGoods.map((item) => {
                                let bestPrice = []
                                item.sizesNprices.forEach((i) => {
                                    bestPrice.push(i.split(' - ')[1])
                                })
                                return (
                                    <CardMini
                                        id={item.article}
                                        name={item.brand + ' ' + item.name}
                                        price={bestPrice.sort((a, b) => { return a - b })[0]}
                                        photo={item.thumbnail}
                                        key={item.brand + ' ' + item.name} />
                                )
                            }) : false
                    }
                </div>
            </div>
        </>
    )
}

export default Catalog
