import { CarParkInfo } from '../types';

describe('CarParkInfo type', () => {
  it('should allow creating a basic CarParkInfo object with required fields', () => {
    const info: CarParkInfo = {
      name: 'Test Park',
      latitude: 22.28,
      longitude: 114.15,
    };
    expect(info.name).toBe('Test Park');
    expect(info.latitude).toBe(22.28);
    expect(info.longitude).toBe(114.15);
  });

  it('should allow optional displayAddress field', () => {
    const info: CarParkInfo = {
      name: 'Test Park',
      latitude: 22.28,
      longitude: 114.15,
      displayAddress: '123 Test Street',
    };
    expect(info.displayAddress).toBe('123 Test Street');
  });

  it('should allow optional district field', () => {
    const info: CarParkInfo = {
      name: 'Test Park',
      latitude: 22.28,
      longitude: 114.15,
      district: '中西區',
    };
    expect(info.district).toBe('中西區');
  });

  it('should allow optional park_Id field', () => {
    const info: CarParkInfo = {
      name: 'Test Park',
      latitude: 22.28,
      longitude: 114.15,
      park_Id: 'PARK001',
    };
    expect(info.park_Id).toBe('PARK001');
  });

  it('should allow optional paymentMethods array', () => {
    const info: CarParkInfo = {
      name: 'Test Park',
      latitude: 22.28,
      longitude: 114.15,
      paymentMethods: ['Octopus', 'Visa'],
    };
    expect(info.paymentMethods).toEqual(['Octopus', 'Visa']);
  });

  it('should allow optional address object with dcDistrict', () => {
    const info: CarParkInfo = {
      name: 'Test Park',
      latitude: 22.28,
      longitude: 114.15,
      address: { dcDistrict: '灣仔區' },
    };
    expect(info.address?.dcDistrict).toBe('灣仔區');
  });

  it('should allow optional renditionUrls with carpark_photo', () => {
    const info: CarParkInfo = {
      name: 'Test Park',
      latitude: 22.28,
      longitude: 114.15,
      renditionUrls: { carpark_photo: 'https://example.com/photo.jpg' },
    };
    expect(info.renditionUrls?.carpark_photo).toBe('https://example.com/photo.jpg');
  });

  it('should allow additional unknown properties via index signature', () => {
    const info: CarParkInfo = {
      name: 'Test Park',
      latitude: 22.28,
      longitude: 114.15,
      customField: 'custom value',
    };
    expect(info['customField']).toBe('custom value');
  });

  it('should allow a fully populated CarParkInfo object', () => {
    const info: CarParkInfo = {
      name: 'Central Park',
      latitude: 22.2821,
      longitude: 114.1588,
      displayAddress: '1 Central Road',
      district: '中西區',
      park_Id: 'CP001',
      paymentMethods: ['Octopus', 'Cash'],
      address: { dcDistrict: '中西區', streetName: 'Central Road' },
      renditionUrls: { carpark_photo: 'https://example.com/cp.jpg', thumbnail: 'https://example.com/thumb.jpg' },
    };
    expect(info.name).toBe('Central Park');
    expect(info.address?.dcDistrict).toBe('中西區');
    expect(info.renditionUrls?.carpark_photo).toBe('https://example.com/cp.jpg');
  });
});
