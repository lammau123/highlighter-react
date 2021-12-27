import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({adapter: new Adapter()});
import Highlighter from "../src/components/Highlighter";

describe("Highlighter", () => {
  let wrapper;
  
  beforeEach(() => {
    wrapper = mount(<Highlighter />);
  });
  afterEach(() => wrapper.unmount());
  
  describe("renders correct elements", () => {
    it('should have a ".source-text" textarea', () => {
      const sourceText = wrapper.find(".source-text").hostNodes();
      expect(sourceText.exists()).toBe(true);
      expect(sourceText).toHaveLength(1);
    });
    
    it('should have a ".search-term" input', () => {
      const searchTerm = wrapper.find(".search-term").hostNodes();
      expect(searchTerm.exists()).toBe(true);
      expect(searchTerm).toHaveLength(1);
    });
    
    it('should have a ".result" element', () => {
      const result = wrapper.find(".result").hostNodes();
      expect(result.exists()).toBe(true);
      expect(result).toHaveLength(1);
      expect(result.text()).toBe("");
    });
    
    it('should have a ".case-sensitive" input checkbox', () => {
      const caseSensitive = wrapper.find('.case-sensitive[type="checkbox"]').hostNodes();
      expect(caseSensitive.exists()).toBe(true);
      expect(caseSensitive).toHaveLength(1);
    });
  });
  
  describe("responds correctly to all input behaviors", () => {
    it('should allow input on ".source-text"', () => {
      const sourceText = wrapper.find(".source-text").hostNodes();
      sourceText.simulate("change", { target: { value: "hello world" } });
      expect(sourceText.instance().value).toEqual("hello world");
    });
    
    it('should reflect changes to ".result"', () => {
      const sourceText = wrapper.find(".source-text").hostNodes();
      sourceText.simulate("change", { target: { value: "hello world" } });
      const result = wrapper.find(".result").hostNodes();
      expect(result.text()).toEqual("hello world");
      expect(result.html()).toContain("hello world");
    });
    
    it('should allow input on ".search-term"', () => {
      const searchTerm = wrapper.find(".search-term").hostNodes();
      searchTerm.simulate("change", { target: { value: "o" } });
      expect(searchTerm.instance().value).toEqual("o");
    });
    
    it('should highlight search results in ".result"', () => {
      const sourceText = wrapper.find(".source-text").hostNodes();
      sourceText.simulate("change", { target: { value: "hello world" } });
      const searchTerm = wrapper.find(".search-term").hostNodes();
      searchTerm.simulate("change", { target: { value: "o" } });
      const expected = "hell<mark>o</mark> w<mark>o</mark>rld";
      expect(wrapper.find(".result").hostNodes().html()).toContain(expected);
    });
    
    it('should respond to changes on ".source-text"', () => {
      const sourceText = wrapper.find(".source-text").hostNodes();
      sourceText.simulate("change", { target: { value: "hello world" } });
      expect(sourceText.instance().value).toEqual("hello world");
      const text = "Hello world! Hello hellohello";
      sourceText.simulate("change", { target: { value: text } });
      expect(sourceText.instance().value).toEqual(text);
    });
    
    it('should respond to changes on ".search-term"', () => {
      const searchTerm = wrapper.find(".search-term").hostNodes();
      searchTerm.simulate("change", { target: { value: "o" } });
      expect(searchTerm.instance().value).toEqual("o");
      searchTerm.simulate("change", { target: { value: "Hello" } });
      expect(searchTerm.instance().value).toEqual("Hello");
    });
    
    it('should highlight substrings of ".result" case-insensitively', () => {
      const text = "Hello world! Hello hellohello";
      const sourceText = wrapper.find(".source-text").hostNodes();
      sourceText.simulate("change", { target: { value: text } });
      const searchTerm = wrapper.find(".search-term").hostNodes();
      searchTerm.simulate("change", { target: { value: "hello" } });
      const resultText = "<mark>Hello</mark> world! <mark>Hello</mark> <mark>hello</mark><mark>hello</mark>";
      expect(wrapper.find(".result").hostNodes().html()).toContain(resultText);
    });
    
    it('should respond to checking ".case-sensitive"', () => {
      wrapper.find(".case-sensitive").hostNodes().simulate("change", { target: { type: "checkbox" } });
      expect(wrapper.find(".case-sensitive").hostNodes().props().defaultChecked).toBe(true);
    });
    
    it('should highlight substrings of ".result" case-sensitively', () => {
      const text = "Hello world! Hello hellohello";
      const sourceText = wrapper.find(".source-text").hostNodes();
      sourceText.simulate("change", { target: { value: text } });
      wrapper.find(".case-sensitive").hostNodes().simulate("change", { target: { type: "checkbox" } });
      const searchTerm = wrapper.find(".search-term").hostNodes();
      searchTerm.simulate("change", { target: { value: "Hello" } });
      const resultText = "<mark>Hello</mark> world! <mark>Hello</mark> hellohello";
      expect(wrapper.find(".result").hostNodes().html()).toContain(resultText);
    });
    
    it('should respond to checking ".case-sensitive" multiple times', () => {
      wrapper.find(".case-sensitive").hostNodes()
             .simulate("change", { target: { type: "checkbox" } })
      ;
      expect(wrapper.find(".case-sensitive").hostNodes().props().defaultChecked).toBe(true);
      wrapper.find(".case-sensitive").hostNodes()
             .simulate("change", { target: { type: "checkbox" } })
      ;
      expect(wrapper.find(".case-sensitive").hostNodes().props().defaultChecked).toBe(false);
    });
  });
});
