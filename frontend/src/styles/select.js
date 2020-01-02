/** SELECT STYLE */
export const selectStyle = {
  option: provided => ({
    ...provided,
    padding: 10,
    width: '100%',
  }),
  control: () => ({
    display: 'flex',
    border: '1px solid #ddd',
    borderRadius: 5,
    fontSize: 16,
    height: 45,
    marginTop: 5,
    color: '#444',
    marginBottom: 10,
  }),
};
