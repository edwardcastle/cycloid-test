import { setActivePinia, createPinia } from 'pinia'
import { useFruits } from '@/stores/fruits.js'

describe('fruits store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('check initial state', () => {
    const fruitsStore = useFruits()
    expect(fruitsStore.loading).toBeFalsy()
    expect(fruitsStore.fruits).toEqual([])
    expect(fruitsStore.fruitsLength).toBe(0)
    expect(fruitsStore.currentFruit).toBeNull()
  })

  const mockFetchSuccess = data => {
    vi.mock('fetch', () =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(data),
      }),
    )
  }

  it('getFruits fetches data successfully', async () => {
    const mockFruits = [
      {
        id: 1,
        isFruit: true,
        name: 'pineapple',
        image:
          'https://raw.githubusercontent.com/cycloidio/fictional-eureka/master/assets/pineapple.jpg',
        price: '933.00',
        color: '#40504c',
        description:
          'The pineapple (Ananas comosus) is a tropical plant with an edible fruit and the most economically significant plant in the family Bromeliaceae.',
        taste: 'Intelligent',
        expires: '2025-09-11T04:33:36.240Z',
      },
      {
        id: 2,
        isFruit: true,
        name: 'orange',
        image:
          'https://raw.githubusercontent.com/cycloidio/fictional-eureka/master/assets/orange.jpg',
        price: '512.00',
        color: '#2d441b',
        description:
          'The orange is the fruit of various citrus species in the family Rutaceae (see list of plants known as orange); it primarily refers to Citrus × sinensis, which is also called sweet orange, to distinguish it from the related Citrus × aurantium, referred to as bitter orange. The sweet orange reproduces asexually (apomixis through nucellar embryony); varieties of sweet orange arise through mutations.',
        taste: 'Sleek',
        expires: '2024-04-05T16:00:21.757Z',
      },
      {
        id: 3,
        isFruit: true,
        name: 'banana',
        image:
          'https://raw.githubusercontent.com/cycloidio/fictional-eureka/master/assets/banana.jpg',
        price: '596.00',
        color: '#6e6e54',
        description:
          'A banana is an elongated, edible fruit – botanically a berry – produced by several kinds of large herbaceous flowering plants in the genus Musa.',
        taste: 'Small',
        expires: '2025-01-31T09:22:18.127Z',
      },
      {
        id: 4,
        isFruit: true,
        name: 'tomato',
        image:
          'https://raw.githubusercontent.com/cycloidio/fictional-eureka/master/assets/tomato.jpg',
        price: '11.00',
        color: '#367d60',
        description:
          'The tomato is the edible, often red, berry of the plant Solanum lycopersicum, commonly known as a tomato plant. The species originated in western South America and Central America.',
        taste: 'Licensed',
        expires: '2025-08-01T21:54:47.954Z',
      },
      {
        id: 5,
        isFruit: true,
        name: 'apple',
        image:
          'https://raw.githubusercontent.com/cycloidio/fictional-eureka/master/assets/apple.jpg',
        price: '461.00',
        color: '#155d20',
        description: 'An apple is an edible fruit produced by an apple tree.',
        taste: 'Fantastic',
        expires: '2023-12-11T16:35:21.953Z',
      },
      {
        id: 6,
        isFruit: true,
        name: 'kiwi',
        image:
          'https://raw.githubusercontent.com/cycloidio/fictional-eureka/master/assets/kiwi.jpg',
        price: '497.00',
        color: '#011744',
        description:
          'Kiwifruit (often shortened to kiwi outside Australia and New Zealand), or Chinese gooseberry, is the edible berry of several species of woody vines in the genus Actinidia.',
        taste: 'Small',
        expires: '2024-11-19T08:49:35.172Z',
      },
      { isFruit: true },
    ]
    mockFetchSuccess({ data: { fruitCount: 6, fruits: mockFruits } })
    const fruitsStore = useFruits()
    await fruitsStore.getFruits()

    expect(fruitsStore.loading).toBeFalsy()
    expect(fruitsStore.fruits.length).toBeGreaterThan(0)
  })

  it('getFruitById fetches fruit successfully', async () => {
    const mockFruit = {
      isFruit: true,
      name: 'pineapple',
      image:
        'https://raw.githubusercontent.com/cycloidio/fictional-eureka/master/assets/pineapple.jpg',
      price: '768.00',
      color: '#07655f',
      description:
        'The pineapple (Ananas comosus) is a tropical plant with an edible fruit and the most economically significant plant in the family Bromeliaceae.',
      taste: 'Rustic',
      expires: '2025-09-20T10:35:26.376Z',
      id: 1,
    }
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockFruit),
    })

    const fruitsStore = useFruits()
    await fruitsStore.getFruitById(1)
    expect(fruitsStore.currentFruit).toEqual(mockFruit)
  })

  it('createFruit creates a new fruit', async () => {
    const mockNewFruit = {
      isFruit: true,
      name: 'strawberry',
      image: 'paht/to/image',
      description: 'this is a description',
      taste: 'delicious',
      color: '#000000',
      price: 78,
      expires: '2024-11-19',
      id: 7,
    }
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockNewFruit),
    })

    const fruitsStore = useFruits()
    await fruitsStore.createFruit(mockNewFruit)
    expect(fruitsStore.fruits).toContainEqual(mockNewFruit)
  })

  it('deleteFruit deletes a fruit', async () => {
    const mockFruits = [
      {
        id: 1,
        isFruit: true,
        name: 'pineapple',
        image:
          'https://raw.githubusercontent.com/cycloidio/fictional-eureka/master/assets/pineapple.jpg',
        price: '933.00',
        color: '#40504c',
        description:
          'The pineapple (Ananas comosus) is a tropical plant with an edible fruit and the most economically significant plant in the family Bromeliaceae.',
        taste: 'Intelligent',
        expires: '2025-09-11T04:33:36.240Z',
      },
      {
        id: 2,
        isFruit: true,
        name: 'orange',
        image:
          'https://raw.githubusercontent.com/cycloidio/fictional-eureka/master/assets/orange.jpg',
        price: '512.00',
        color: '#2d441b',
        description:
          'The orange is the fruit of various citrus species in the family Rutaceae (see list of plants known as orange); it primarily refers to Citrus × sinensis, which is also called sweet orange, to distinguish it from the related Citrus × aurantium, referred to as bitter orange. The sweet orange reproduces asexually (apomixis through nucellar embryony); varieties of sweet orange arise through mutations.',
        taste: 'Sleek',
        expires: '2024-04-05T16:00:21.757Z',
      },
      {
        id: 3,
        isFruit: true,
        name: 'banana',
        image:
          'https://raw.githubusercontent.com/cycloidio/fictional-eureka/master/assets/banana.jpg',
        price: '596.00',
        color: '#6e6e54',
        description:
          'A banana is an elongated, edible fruit – botanically a berry – produced by several kinds of large herbaceous flowering plants in the genus Musa.',
        taste: 'Small',
        expires: '2025-01-31T09:22:18.127Z',
      },
      {
        id: 4,
        isFruit: true,
        name: 'tomato',
        image:
          'https://raw.githubusercontent.com/cycloidio/fictional-eureka/master/assets/tomato.jpg',
        price: '11.00',
        color: '#367d60',
        description:
          'The tomato is the edible, often red, berry of the plant Solanum lycopersicum, commonly known as a tomato plant. The species originated in western South America and Central America.',
        taste: 'Licensed',
        expires: '2025-08-01T21:54:47.954Z',
      },
      {
        id: 5,
        isFruit: true,
        name: 'apple',
        image:
          'https://raw.githubusercontent.com/cycloidio/fictional-eureka/master/assets/apple.jpg',
        price: '461.00',
        color: '#155d20',
        description: 'An apple is an edible fruit produced by an apple tree.',
        taste: 'Fantastic',
        expires: '2023-12-11T16:35:21.953Z',
      },
      {
        id: 6,
        isFruit: true,
        name: 'kiwi',
        image:
          'https://raw.githubusercontent.com/cycloidio/fictional-eureka/master/assets/kiwi.jpg',
        price: '497.00',
        color: '#011744',
        description:
          'Kiwifruit (often shortened to kiwi outside Australia and New Zealand), or Chinese gooseberry, is the edible berry of several species of woody vines in the genus Actinidia.',
        taste: 'Small',
        expires: '2024-11-19T08:49:35.172Z',
      },
      { isFruit: true },
    ]
    const mockFruitsWithDeleted = [
      {
        id: 2,
        isFruit: true,
        name: 'orange',
        image:
          'https://raw.githubusercontent.com/cycloidio/fictional-eureka/master/assets/orange.jpg',
        price: '512.00',
        color: '#2d441b',
        description:
          'The orange is the fruit of various citrus species in the family Rutaceae (see list of plants known as orange); it primarily refers to Citrus × sinensis, which is also called sweet orange, to distinguish it from the related Citrus × aurantium, referred to as bitter orange. The sweet orange reproduces asexually (apomixis through nucellar embryony); varieties of sweet orange arise through mutations.',
        taste: 'Sleek',
        expires: '2024-04-05T16:00:21.757Z',
      },
      {
        id: 3,
        isFruit: true,
        name: 'banana',
        image:
          'https://raw.githubusercontent.com/cycloidio/fictional-eureka/master/assets/banana.jpg',
        price: '596.00',
        color: '#6e6e54',
        description:
          'A banana is an elongated, edible fruit – botanically a berry – produced by several kinds of large herbaceous flowering plants in the genus Musa.',
        taste: 'Small',
        expires: '2025-01-31T09:22:18.127Z',
      },
      {
        id: 4,
        isFruit: true,
        name: 'tomato',
        image:
          'https://raw.githubusercontent.com/cycloidio/fictional-eureka/master/assets/tomato.jpg',
        price: '11.00',
        color: '#367d60',
        description:
          'The tomato is the edible, often red, berry of the plant Solanum lycopersicum, commonly known as a tomato plant. The species originated in western South America and Central America.',
        taste: 'Licensed',
        expires: '2025-08-01T21:54:47.954Z',
      },
      {
        id: 5,
        isFruit: true,
        name: 'apple',
        image:
          'https://raw.githubusercontent.com/cycloidio/fictional-eureka/master/assets/apple.jpg',
        price: '461.00',
        color: '#155d20',
        description: 'An apple is an edible fruit produced by an apple tree.',
        taste: 'Fantastic',
        expires: '2023-12-11T16:35:21.953Z',
      },
      {
        id: 6,
        isFruit: true,
        name: 'kiwi',
        image:
          'https://raw.githubusercontent.com/cycloidio/fictional-eureka/master/assets/kiwi.jpg',
        price: '497.00',
        color: '#011744',
        description:
          'Kiwifruit (often shortened to kiwi outside Australia and New Zealand), or Chinese gooseberry, is the edible berry of several species of woody vines in the genus Actinidia.',
        taste: 'Small',
        expires: '2024-11-19T08:49:35.172Z',
      },
      { isFruit: true },
    ]
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({ ok: true })

    const fruitsStore = useFruits()
    fruitsStore.fruits = mockFruits
    expect(fruitsStore.fruits.length).toEqual(7)
    await fruitsStore.deleteFruit(1)
    expect(fruitsStore.fruits).toEqual(mockFruitsWithDeleted)
    expect(fruitsStore.fruits.length).toEqual(6)
  })
})
