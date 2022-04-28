import { TestBed } from '@angular/core/testing';
import { FhirPatientService } from './fhir-patient.service';
import * as ptd from '../../assets/patienttestdata.json';

import { fhirclient } from 'fhirclient/lib/types';
import Patient = fhirclient.FHIR.Patient;

fdescribe('FhirPatientService', () => {
  let service: FhirPatientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FhirPatientService);
  });

  // STANDARD TEST
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /**
   * Test incorrect name and correct name
   *
   *
   */
  it('should NOT return patients name', () => {
    expect(service.getName(ptd as Patient)).not.toBe('Janette');
  });

  it('should return patients name', () => {
    expect(service.getName(ptd as Patient)).toBe('Jessica Argonaut');
  });

  /**
   * Tests incorret bday and correct bday
   *
   *
   */
  it('should NOT return patients bday', () => {
    expect(service.getBday(ptd as Patient)).not.toBe('6666-66-66');
  });

  it('should return patients bday', () => {
    expect(service.getBday(ptd as Patient)).toBe('1985-08-01');
  });

  /**
   * Tests incorrect gender and correct gender
   *
   *
   */
  it('should NOT return patients gender', () => {
    expect(service.getGender(ptd as Patient)).not.toBe('MALE');
  });

  it('should return patients gender', () => {
    expect(service.getGender(ptd as Patient)).toBe('FEMALE');
  });

  /**
   * Tests incorrect phone number and correct phone number
   *
   *
   */
  it('should NOT return patients phone number', () => {
    expect(service.getPhoneNum(ptd as Patient)).not.toBe('777-777-7777');
  });

  it('should return patients phone number', () => {
    expect(service.getPhoneNum(ptd as Patient)).toBe('608-271-9000');
  });

  /**
   * Tests incorrect address and correct address
   *
   *
   */
  it('should NOT return patients address', () => {
    expect(service.getAddress(ptd as Patient)).not.toBe('9999 Doobie Ln, New York City, NY 12345');
  });

  it('should return patients address', () => {
    expect(service.getAddress(ptd as Patient)).toBe('Vandtårnsvej 83A 2860 Søborg, Kobenhavn, CHIS 1234');
  });

  /**
   * Tests incorrect language and correct language
   *
   *
   */
  it('should NOT return patients primary language', () => {
    expect(service.getLanguage(ptd as Patient)).not.toBe('Portugese');
  });

  it('should return patients primary language', () => {
    expect(service.getLanguage(ptd as Patient)).toBe('Danish');
  });

  /**
   * Tests incorrect care provider and correct care provider
   *
   *
   */
  it('should NOT return patients primary care provider', () => {
    expect(service.getProvider(ptd as Patient)).not.toBe('Dr. Dufendach');
  });

  it('should return patients primary care provider', () => {
    expect(service.getProvider(ptd as Patient)).toBe('Physician, Gemini, MD');
  });
});
